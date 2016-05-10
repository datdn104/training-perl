#!/usr/bin/perl -w
use CGI;
use DBI;
use strict;
use warnings;
use Data::Dumper;
use CGI::Carp 'fatalsToBrowser';
use HTML::Template;
use Digest::MD5 qw(md5_hex);
use CGI::Cookie;

my $cgi = CGI->new;
my @errors = ();
my $template = HTML::Template->new(filename => 'register.tmpl');
$template->param(TITLE => "Register");

if ($ENV{'REQUEST_METHOD'} eq "POST") {

	my $name = $cgi->param("name");
	my $email = $cgi->param("email");
	my $password = $cgi->param("password");
	my $password_confirm = $cgi->param("password_confirm");

	check_name($name);
	check_email($email);
	check_password($password, $password_confirm);

	# connect to the database
	my $dbh = DBI->connect("DBI:mysql:database=training_perl", "root", "123456") or die $DBI::errstr;
	check_exist($name, $email, $dbh);

	if(scalar(@errors) == 0){
		# check the email and password in the database
		my $sth = $dbh->prepare("INSERT INTO User(name,email,password) values(?,?,?)");
		$sth->execute($name, $email, md5_hex($password)) or die $sth->errstr;
		$sth->finish();

		print $cgi->redirect(-url=>'/cgi-bin/login.cgi');
	}

	$dbh->disconnect;
}

if(scalar(@errors) > 0){
	$template->param(IS_ERROR => 1);
	$template->param(ERRORS => [@errors]);
}

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
	my ($name, $email) = $sth->fetchrow_array();

	push(@errors, {messager=>"Name is exist"}) && return if($name);
	push(@errors, {messager=>"Email is exist"}) && return if($email);

	$sth->finish();
}