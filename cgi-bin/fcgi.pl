#!/usr/bin/perl -wT

use lib qw(/home/vagrant/perl5/lib/perl5);
use CGI::Carp 'fatalsToBrowser';
# use CGI::Fast;
# use strict;
# use warnings;
# use vars qw($count);

# $count = 0;

# while(my $cgi = new CGI::Fast){
# 	print "Content-type: text/html\n\n";
#     print "Hello world.\n", ++$count;
# }

use FCGI;

my $count = 0;
my $request = FCGI::Request();

while($request->Accept() >= 0) {
   print("Content-type: text/html\r\n\r\n", ++$count, "\n");
   
	if ( $request->IsFastCGI ) { 
		print "we're running under FastCGI!\n";
	} else { 
	    print "plain old boring CGI\n";
	}
}
