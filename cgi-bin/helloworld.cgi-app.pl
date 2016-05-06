#!/usr/bin/perl -wT
##
##  CGI Application Hello World
##
use strict;
use lib qw(.);
use CGI::Carp 'fatalsToBrowser';
use HelloWorldCgiApp;
my $helloworld = HelloWorldCgiApp->new();
$helloworld->run();