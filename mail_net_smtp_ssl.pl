use Net::SMTP::SSL;

my $smtp = Net::SMTP::SSL->new('smtp.gmail.com',
                    Port=> 465,
                    Timeout => 20,
                    # Debug => 1
                    );
print $smtp->domain,"\n";
$sender = 'datdn@nal.vn';
$password = 'ngocdat7601_';
$smtp->auth ( $sender, $password ) or die "could not authenticate\n";
$receiver = 'ngocdat.7601@gmail.com';

$subject = "my custom subject";
$smtp->mail($sender);
$smtp->to($receiver);
$smtp->data();
$smtp->datasend("To: <$receiver> \n");
$smtp->datasend("From: <$sender> \n");
$smtp->datasend("Content-Type: text/html \n");
$smtp->datasend("Subject: $subject");
$smtp->datasend("\n");
$smtp->datasend('the body of the email');
$smtp->dataend();
$smtp->quit();
print "done\n\n";