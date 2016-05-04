use Net::SMTP::TLS;

$sender = 'datdn@nal.vn';
$password = 'ngocdat7601';
$receiver = 'ngocdat.7601@gmail.com';

my $smtp = new Net::SMTP::TLS(
    'smtp.gmail.com',
    Hello   =>      'smtp.gmail.com',
    Port    =>      587,
    User    =>      $sender,
    Password=>      $password
    );

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