#!/usr/bin/perl -w
use lib qw(/home/vagrant/perl5/lib/perl5);
use CGI::Carp 'fatalsToBrowser';
use CGI;
use DBI;
use strict;
use warnings;
use Data::Dumper;
use HTML::Template;
use Digest::MD5 qw(md5_hex);
use CGI::Cookie;
use Data::FormValidator;
use Data::FormValidator::Constraints qw/:closures/;
use constant {
    FALSE => 0,
    TRUE   => 1,
};

my $cgi = CGI->new;	
my @errors = ();
my $template = HTML::Template->new(filename => "register.tmpl");
print $cgi->header(-type => "text/html", -charset => "utf-8");

if ($ENV{'REQUEST_METHOD'} eq "POST") {

	my $name = $cgi->param("name");
	my $email = $cgi->param("email");
	my $password = $cgi->param("password");
	my $password_confirm = $cgi->param("password_confirm");

	# check_name($name);
	# check_email($email);
	# check_password($password, $password_confirm);

	my %msgs = (
		prefix => "err_",
		constraints => {
			'password_confirm' => "Incorrect password confirmation",
		},
		invalid_separator => ' <br /> ',
		format => '<span style="color: red;">ERROR: %s</span>'
	);

	my $res = Data::FormValidator->check($cgi, +{
        required => [qw/name email password password_confirm/],
        constraint_methods => +{
            name  => FV_length_between(3, 8),
            email => email(),
        },
        constraints => {
        	password_confirm => {
        		name => 'password_confirm',
            	params => [ qw(password password_confirm)],
            	constraint => sub{ $_[0] eq $_[1] }
        	}
        },
        msgs => \%msgs
    });

	# connect to the database
	my $dbh = DBI->connect("DBI:mysql:database=training_perl", "root", "123456") or die $DBI::errstr;
	check_exist($name, $email, $dbh);

    if($res->has_invalid() or $res->has_missing() or scalar(@errors) > 0){
		# $template->param(message => '<div id="registerError" class="error">There were some errors</div>');
		$template->param($res->msgs());
	}else{
		# $template->param(message => '<div id="registerError" class="success">All valid! Thankyou.</div>');
		my $sth = $dbh->prepare("INSERT INTO User(name,email,password) values(?,?,?)");
		$sth->execute($name, $email, md5_hex($password)) or die $sth->errstr;
		$sth->finish();
		$dbh->disconnect;
		print $cgi->redirect(-url=>'/cgi-bin/login.cgi');
	}

	print $cgi->header(-type => "text/html", -charset => "utf-8");
	print Dumper($res->msgs());

	$dbh->disconnect;
	$template->param(NAME => $name);
	$template->param(EMAIL => $email);
}

if(scalar(@errors) > 0){
	$template->param(IS_ERROR => 1);
	$template->param(ERRORS => [@errors]);
}

$template->param(TITLE => "Register");

print $cgi->header(-type => "text/html", -charset => "utf-8");
print $template->output;


#===========================================================
sub check_name{
	my $name = shift;
	push(@errors, {messager=>"Name cannot be empty."}) unless (length($name) > 0);
}

sub check_email{
	my $email = shift;
	push(@errors, {messager=>"Email cannot be empty."}) && return unless (length($email) > 0);
	push(@errors, {messager=>"Invalid email"}) unless ($email =~ /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm);
}

sub check_password{
	my ($password, $password_confirm) = @_;
	push(@errors, {messager=>"Password cannot be empty."}) unless (length($password) > 0);
	push(@errors, {messager=>"Incorrect password confirmation"}) unless($password eq $password_confirm);
}

sub check_exist{
	my ($name, $email, $dbh) = @_;
	my $sth = $dbh->prepare("SELECT name, email FROM User WHERE name = ? OR email = ?");
	$sth->execute($name, $email) or die $sth->errstr;
	my ($name_, $email_) = $sth->fetchrow_array();

	push(@errors, {messager=>"Name is exist"}) if($name_ eq $name && $name != undef);
	push(@errors, {messager=>"Email is exist"}) if($email_ eq $email && $email != undef);

	$sth->finish();
}