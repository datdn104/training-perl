#- Hex2Bin.pl
#- Copyright (c) 1995 by Dr. Herong Yang
#
   ($in, $out) = @ARGV;
   die "Missing input file name.\n" unless $in;
   die "Missing output file name.\n" unless $out;
   $byteCount = 0;
   open(IN, "< $in");
   open(OUT, "> $out");
   binmode(OUT);
   while (<IN>) {
      chop;
      $s = length($_);
      $byteCount += $s/2;
      print (OUT pack("H$s", $_));
   }
   close(IN);
   close(OUT);
   print "Number of bytes converted = $byteCount\n";
   exit;