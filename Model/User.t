use Test::More;
use Test::Exception;
use Model::User;
use Data::Dumper;

BEGIN {
	use_ok("Model::User") or exit;
	can_ok('User', qw(new getId getName getEmail setId setName setEmail save destroy create update find findAll)) or exit;
	new_ok('User') or exit;
}

SKIP: {
	$user = User->new("datdn", 'datdn@nal.vn');
	skip("User is UNDEF", 13) unless $user;

	#+++++++++++++++++++++++++++++++++++++++++++++++
	ok("datdn" eq $user->getName(), "new Name is OK");
	ok('datdn@nal.vn' eq $user->getEmail(), "new Email is OK");

	#+++++++++++++++++++++++++++++++++++++++++++++++
	lives_ok { $user->save() } 'create() is live';
	lives_ok { User->find(0) } 'find() is live';

	#+++++++++++++++++++++++++++++++++++++++++++++++
	if(isa_ok(User->find($user->getId()), "User")){
		pass("create user is OK");
	}else{
		fail("create user not OK");
	}

	#+++++++++++++++++++++++++++++++++++++++++++++++
	$email = $user->getEmail();
	$user->setEmail($email."_");
	ok($email."_" eq $user->getEmail(), "setEmail is OK");
	lives_ok { $user->save() } 'update() is live';
	if(isa_ok(User->find($user->getId()), "User")){
		pass("update user is OK");
	}else{
		fail("update user not OK");
	}

	#+++++++++++++++++++++++++++++++++++++++++++++++
	lives_ok { User->findAll() } 'findAll() is live';
	lives_ok { $user->destroy()} 'destroy() is live';
	ok(User->find($user->getId()) == undef, "destroy user is OK");
}

TODO: {
	local $TODO = "User not finished";
	pass("Test TODO");
}

done_testing( $number_of_test_run );