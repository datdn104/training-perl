package Model::User;

use 5.006;
use strict;
use warnings;
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
	return bless($self, $class);
}

=head1 NAME

Model::User - The great new Model::User!

=head1 VERSION

Version 0.01

=cut

our $VERSION = '0.01';


=head1 SYNOPSIS

Quick summary of what the module does.

Perhaps a little code snippet.

    use Model::User;

    my $user = Model::User->new($name, $email, $id);
	$user->save();
	print $user->getId(), "\n";

	$user->setName($new_name);
	$user->save();
	print $user->getName(), "\n";

	$user->destroy();


	$user = User->find(1);
	print Dumper($user);

	$users = User->findAll();
	print Dumper($users);
    ...


=head1 SUBROUTINES/METHODS

=head2 getId
	return id of object
=cut

sub getId{
	return shift->{_id};
}

=head2 getName
	return name of object
=cut

sub getName{
	return shift->{_name};
}

=head2 getEmail
	return email of object
=cut

sub getEmail{
	return shift->{_email};
}

=head2 setEmail
	Set Id of object
	params: id
	return: id
=cut

sub setId{
	my ($self, $id) = @_;
	$self->{_id} = $id if defined($id);
	return $self->{_id};
}

=head2 setName
	Set Name of object
	params: name
	return: Name
=cut

sub setName{
	my ($self, $name) = @_;
	$self->{_name} = $name if defined($name);
	return $self->{_name};
}

=head2 setEmail
	Set Email of object
	params: email
	return: email
=cut

sub setEmail{
	my ($self, $email) = @_;
	$self->{_email} = $email if defined($email);
	return $self->{_email};
}

=head2 save
	Save object to Database
=cut

sub save{
	my $self = shift;
	if($self->getId() == 0){
		$self->create();
	}else{
		$self->update;
	}
}

=head2 destroy
	destroy object in Database
=cut

sub destroy{
	my $self = shift;
	my $sth = $dbh->prepare("DELETE FROM User WHERE id = ?");
	$sth->execute($self->getId()) or die $DBI::errstr;
	$sth->finish();
}

=head2 create
	create object to Database
=cut

sub create{
	my $self = shift;
	my $sth = $dbh->prepare("INSERT INTO User (name, email) values (?,?)");
	$sth->execute($self->getName(), $self->getEmail()) or die $DBI::errstr;
	$self->setId($sth->{mysql_insertid});
	$sth->finish();
}

=head2 update
	update object from Database
=cut

sub update{
	my $self = shift;
	my $sth = $dbh->prepare("UPDATE User SET name = ?, email = ? WHERE id = ?");
	$sth->execute($self->getName(), $self->getEmail(), $self->getId()) or die $DBI::errstr;
	$sth->finish();
}

=head2 find
	find object from Database
	params: id
	return: object user
=cut

sub find{
	my ($class, $id) = @_;
	my $sth = $dbh->prepare("SELECT * FROM User WHERE id = ?");
	$sth->execute($id) or die $DBI::errstr;
	my ($id, $name, $email) = $sth->fetchrow_array();
	$sth->finish();
	return new User($name, $email, $id) if $id;
	return undef;
}

=head2 findAll
	find all object from Database
	return: array object user
=cut

sub findAll{
	@users = ();
	my $sth = $dbh->prepare("SELECT * FROM User");
	$sth->execute() or die $DBI::errstr;
	while(my ($id, $name, $email) = $sth->fetchrow_array()){
		push(@users, new User($name, $email, $id));
	}
	$sth->finish();
	return @users;
}

=head1 AUTHOR

Dao Dat, C<< <datdn at nal.vn> >>

=head1 BUGS

Please report any bugs or feature requests to C<bug-model-user at rt.cpan.org>, or through
the web interface at L<http://rt.cpan.org/NoAuth/ReportBug.html?Queue=Model-User>.  I will be notified, and then you'll
automatically be notified of progress on your bug as I make changes.




=head1 SUPPORT

You can find documentation for this module with the perldoc command.

    perldoc Model::User


You can also look for information at:

=over 4

=item * RT: CPAN's request tracker (report bugs here)

L<http://rt.cpan.org/NoAuth/Bugs.html?Dist=Model-User>

=item * AnnoCPAN: Annotated CPAN documentation

L<http://annocpan.org/dist/Model-User>

=item * CPAN Ratings

L<http://cpanratings.perl.org/d/Model-User>

=item * Search CPAN

L<http://search.cpan.org/dist/Model-User/>

=back


=head1 ACKNOWLEDGEMENTS


=head1 LICENSE AND COPYRIGHT

Copyright 2016 Dao Dat.

This program is free software; you can redistribute it and/or modify it
under the terms of the the Artistic License (2.0). You may obtain a
copy of the full license at:

L<http://www.perlfoundation.org/artistic_license_2_0>

Any use, modification, and distribution of the Standard or Modified
Versions is governed by this Artistic License. By using, modifying or
distributing the Package, you accept this license. Do not use, modify,
or distribute the Package, if you do not accept this license.

If your Modified Version has been derived from a Modified Version made
by someone other than you, you are nevertheless required to ensure that
your Modified Version complies with the requirements of this license.

This license does not grant you the right to use any trademark, service
mark, tradename, or logo of the Copyright Holder.

This license includes the non-exclusive, worldwide, free-of-charge
patent license to make, have made, use, offer to sell, sell, import and
otherwise transfer the Package with respect to any patent claims
licensable by the Copyright Holder that are necessarily infringed by the
Package. If you institute patent litigation (including a cross-claim or
counterclaim) against any party alleging that the Package constitutes
direct or contributory patent infringement, then this Artistic License
to you shall terminate on the date that such litigation is filed.

Disclaimer of Warranty: THE PACKAGE IS PROVIDED BY THE COPYRIGHT HOLDER
AND CONTRIBUTORS "AS IS' AND WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES.
THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE, OR NON-INFRINGEMENT ARE DISCLAIMED TO THE EXTENT PERMITTED BY
YOUR LOCAL LAW. UNLESS REQUIRED BY LAW, NO COPYRIGHT HOLDER OR
CONTRIBUTOR WILL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR
CONSEQUENTIAL DAMAGES ARISING IN ANY WAY OUT OF THE USE OF THE PACKAGE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


=cut

1; # End of Model::User
