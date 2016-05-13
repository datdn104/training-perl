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

if ($ENV{'REQUEST_METHOD'} eq "POST") {
# 	print $cgi->header(-type => "application/json", -charset => "utf-8");

	my $email = $cgi->param("email");
	my $password = $cgi->param("password");

	# connect to the database
	my $dbh = DBI->connect("DBI:mysql:database=training_perl", "root", "123456") or die $DBI::errstr;

	# check the email and password in the database
	my $sth = $dbh->prepare("SELECT id FROM User WHERE email=? and password=?");
	$sth->execute($email, md5_hex($password)) or die $sth->errstr;
	my ($id) = $sth->fetchrow_array();
	$sth->finish();
	$dbh->disconnect;

	# create a JSON string according to the database result
	if($id){
		my $cookie = CGI::Cookie->new(-name=>'uid', -value=>$id);
		print $cgi->header(-type => "application/json", -charset => "utf-8",-cookie=>[$cookie]);
		print qq{{"success" : "login is successful", "name" : "ID: $id"}};
	}else{
		print $cgi->header(-type => "application/json", -charset => "utf-8");
		print qq{{"error" : "email or password is wrong"}};
	}
} else {
	print $cgi->header(-type => "text/html", -charset => "utf-8");

	my $template = HTML::Template->new(filename => 'login.tmpl');
	$template->param(TITLE => "Login");

	print $template->output;
}