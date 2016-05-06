#!perl -T
use 5.006;
use strict;
use warnings;
use Test::More;

plan tests => 2;

BEGIN {
    use_ok( 'Model::User' ) || print "Bail out!\n";
    use_ok( 'Model::DAO' ) || print "Bail out!\n";
}

diag( "Testing Model::User $Model::User::VERSION, Perl $], $^X" );
