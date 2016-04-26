#!/usr/bin/perl
use MIME::Lite;
 
$to = 'ngocdat.7601@gmail.com';
$from = 'datdn@nal.vn';
$subject = 'Test Email';
$message = '<h1>This is test email sent by Perl Script</h1>';

$msg = MIME::Lite->new(
                 From     => $from,
                 To       => $to,
                 Subject  => $subject,
                 Data     => $message
                 );
                 
$msg->attr("content-type" => "text/html");         
# $msg->send;
$msg->send('smtp', "smtp.gmail.com", SSL=>1, AuthUser=>"datdn@nal.vn", AuthPass=>"ngocdat7601", Debug=>1);
print "Email Sent Successfully\n";