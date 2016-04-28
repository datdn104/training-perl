use Test::More;
use Test::Exception;
use Model::DAO;

use_ok('Model::DAO') or exit;
can_ok('DAO', qw(connect)) or exit;
lives_ok( sub { DAO->connect() }, 'connect() to live' );

done_testing( $number_of_test_run );