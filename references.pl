#!/usr/bin/perl

# Function definition
sub PrintHash{
   my (%hash) = @_;
   
   foreach $item (%hash){
      print "Item : $item\n";
   }
}

sub PrintArray{
	my ($arr) = @_;
	print "@$arr\n";
}

%hash = ('name' => 'Tom', 'age' => 19);
@arr = (1,2,3);
$r = \@arr;

# Create a reference to above function.
# $cref = \&PrintHash;

# Function call using reference.
# &$cref(%hash);
PrintHash(%hash)

PrintArray($r);


