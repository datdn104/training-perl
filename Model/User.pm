package User;
use Model::DAO;
use Data::Dumper;

BEGIN{
	$dbh = DAO->connect();
}

END{
	$dbh->disconnect;
}

sub new {
	my ($class, $name, $email, $id) = @_;
	my $self = {
		_id => defined($id) ? $id : 0,
		_name => $name,
		_email => $email
	};
	return bless($self, $class);;
}

sub init{
	my ($class, $id, $name, $email) = @_;
	my $self = {
		_id => $id,
		_name => $name,
		_email => $email
	};
	return bless($self, $class);;
}

#=================================================
#object method
sub getId{
	return shift->{_id};
}

sub getName{
	return shift->{_name};
}

sub getEmail{
	return shift->{_email};
}

sub setId{
	my ($self, $id) = @_;
	$self->{_id} = $id if defined($id);
	return $self->{_id};
}

sub setName{
	my ($self, $name) = @_;
	$self->{_name} = $name if defined($name);
	return $self->{_name};
}

sub setEmail{
	my ($self, $email) = @_;
	$self->{_email} = $email if defined($email);
	return $self->{_email};
}

sub save{
	my $self = shift;
	if($self->getId() == 0){
		$self->create();
	}else{
		$self->update;
	}
}

sub destroy{
	my $self = shift;
	my $sth = $dbh->prepare("DELETE FROM User WHERE id = ?");
	$sth->execute($self->getId()) or die $DBI::errstr;
	$sth->finish();
}

sub create{
	my $self = shift;
	my $sth = $dbh->prepare("INSERT INTO User (name, email) values (?,?)");
	$sth->execute($self->getName(), $self->getEmail()) or die $DBI::errstr;
	$self->setId($sth->{mysql_insertid});
	$sth->finish();
}

sub update{
	my $self = shift;
	my $sth = $dbh->prepare("UPDATE User SET name = ?, email = ? WHERE id = ?");
	$sth->execute($self->getName(), $self->getEmail(), $self->getId()) or die $DBI::errstr;
	$sth->finish();
}

#=================================================
#class method
sub find{
	my ($class, $id) = @_;
	my $sth = $dbh->prepare("SELECT * FROM User WHERE id = ?");
	$sth->execute($id) or die $DBI::errstr;
	my ($id, $name, $email) = $sth->fetchrow_array();
	$sth->finish();
	return new User($name, $email, $id);
}

sub find_all{
	@users = ();
	my $sth = $dbh->prepare("SELECT * FROM User");
	$sth->execute() or die $DBI::errstr;
	while(my ($id, $name, $email) = $sth->fetchrow_array()){
		push(@users, new User($name, $email, $id));
	}
	$sth->finish();
	return @users;
}

1;