use Model::User;
use Data::Dumper;

$user = new User('datdn', 'datdn@nal.vn');

sub test{
	my ($user) = @_;
	$user->save();
	

	print Dumper(User->find_all());
	# User->destroy($user);
}

test($user);