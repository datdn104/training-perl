use Test::More;
use Test::Exception;
use Test::MockModule;
use Data::Dumper;

$mock = Test::MockModule->new('Model::User');

#+++++++++++++++++++++++++++++++++++++++++++++++
$mock->mock( new => sub{ return bless({
	_id => 0,
	_name => 'datdn',
	_email => 'datdn@nal.vn'
}, "User")});
isa_ok(Model::User->new(), "User");

#+++++++++++++++++++++++++++++++++++++++++++++++
$mock->mock( getName => 'datdn' );
$mock->mock( getEmail => 'datdn@nal.vn' );
ok("datdn" eq Model::User->getName(), "new Name is OK");
ok('datdn@nal.vn' eq Model::User->getEmail(), "new Email is OK");

# +++++++++++++++++++++++++++++++++++++++++++++++
$mock->mock( save => true );
$mock->mock( find => bless({}, "User") );
lives_ok { Model::User->save() } 'create() is live';
lives_ok { Model::User->find(0) } 'find() is live';

#+++++++++++++++++++++++++++++++++++++++++++++++
$mock->mock( find => bless({}, "User") );
$mock->mock( getId => 0 );
if(isa_ok(Model::User->find(Model::User->getId()), "User")){
	pass("create user is OK");
}else{
	fail("create user not OK");
}

#+++++++++++++++++++++++++++++++++++++++++++++++
$mock->mock( find => bless({}, "User") );
$mock->mock( getId => 0 );
$mock->mock( getEmail => 'datdn@nal.vn_' );
$mock->mock( setEmail => true );
$mock->mock( save => true );
$email = Model::User->getEmail();
Model::User->setEmail($email);
ok('datdn@nal.vn_' eq Model::User->getEmail(), "setEmail is OK");
lives_ok { Model::User->save() } 'update() is live';
if(isa_ok(Model::User->find(Model::User->getId()), "User")){
	pass("update user is OK");
}else{
	fail("update user not OK");
}

#+++++++++++++++++++++++++++++++++++++++++++++++
$mock->mock( find => undef );
$mock->mock( getId => 0 );
$mock->mock( findAll => true );
$mock->mock( destroy => true );
lives_ok { Model::User->findAll() } 'findAll() is live';
lives_ok { Model::User->destroy()} 'destroy() is live';
ok(Model::User->find(Model::User->getId()) == undef, "destroy user is OK");

done_testing( $number_of_test_run );