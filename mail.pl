 use strict;
 use warnings;
 use Try::Tiny;
 
 use Email::Simple;
 use Email::Sender::Simple qw(sendmail);
 use Email::Sender::Transport::SMTP::TLS;
 
 # Create the email message object.
 my $email_object = Email::Simple->create(
     header => [
         From           => 'datdn@nal.vn',
         To             => 'ngocdat.7601@gmail.com',
         Subject        => 'TEST MAIL!',
     ],
     body => 'THIS IS A TEST EMAIL',
 );
 
 # Create the transport. Using gmail for this example
 my $transport = Email::Sender::Transport::SMTP::TLS->new(
     host     => 'smtp.gmail.com',
     port     => 587,
     username => 'datdn@nal.vn',
     password => 'ngocdat7601'
 );
 
 # send the mail
 try {
 	sendmail( $email_object, {transport => $transport} );
 } catch {
 	warn "Email sending failed: $_";
 };