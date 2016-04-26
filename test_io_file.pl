use warnings;
use IO::File;

$fh = IO::File->new();
if ($fh->open("< file.txt")) {
	print <$fh>;
	$fh->close;
}

$fh = IO::File->new("> file.txt");
if(defined $fh) {
	print $fh "bar\n";
	print $fh "tets thu cai cho vui\n";
	print $fh "enter\n";
	$fh->close;
}