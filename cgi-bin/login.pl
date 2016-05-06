#!/usr/bin/perl -wT

use CGI;
use DBI;
use strict;
use warnings;
use Data::Dumper;

# read the CGI params
my $cgi = CGI->new;
print $cgi->header(-type => "application/json", -charset => "utf-8");

my $email = $cgi->param("email");
my $password = $cgi->param("password");

# connect to the database
my $dbh = DBI->connect("DBI:mysql:database=training_perl", "root", "123456") or die $DBI::errstr;

# check the email and password in the database
my $sth = $dbh->prepare("SELECT name FROM User WHERE email=? and password=?");
$sth->execute($email, $password) or die $sth->errstr;
my ($name) = $sth->fetchrow_array;

# create a JSON string according to the database result
my $json = ($name) ? qq{{"success" : "login is successful", "name" : "$name"}} : qq{{"error" : "email or password is wrong"}};

print $json;