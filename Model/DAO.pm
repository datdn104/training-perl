package DAO;
use DBI;

my $driver = "mysql";
my $database = "training_perl";
my $dns = "DBI:$driver:database=$database";
my $userid = "root";
my $password = "123456";

sub connect{
	$dbh = DBI->connect($dns, $userid, $password) or die $DBI::errstr;
	return $dbh;
}

1;