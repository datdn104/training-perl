#!/usr/bin/perl
use warnings;

open(my $out, '>:raw', 'sample.bin') or die "Unable to open: $!";
print $out pack('s<',"chan vai dai") ;
close($out);