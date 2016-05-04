#!/usr/bin/perl
use strict;
use warnings;
use Try::Tiny;
use IO::All;
use Email::MIME;
use Email::Sender::Simple qw(sendmail);
use Email::Sender::Transport::SMTP::TLS;
 
# Create and array of email parts. 
# Here i have 2 attachments ( an image and a pdf file) and a text message.
my @parts = (
    Email::MIME->create(
        attributes => {
            filename      => "datdn.jpg",
            content_type  => "image/jpeg",
            encoding      => "base64",
            disposition   => "attachment",
            Name          => "image.jpg"
        },
        body => io( "file/datdn.jpg" )->all,
    ),
    Email::MIME->create(
        attributes => {
            filename     => "perloo.pdf",
            content_type => "application/pdf",
            encoding     => "base64",
            disposition  => "attachment",
            name         => "document.pdf",
        },
        body => io( "file/perloo.pdf" )->all,
    ),
    Email::MIME->create(
        attributes => {
            content_type  => "text/html",
        },
        body => 'THIS IS A TEST EMAIL',
    )
);
 
# Create the email message object.
my $email_object = Email::MIME->create(
    header => [
        From           => 'datdn@nal.vn',
        To             => 'ngocdat.7601@gmail.com',
        Subject        => 'TEST MAIL!',
        content_type   =>'multipart/mixed'
    ],
    parts  => [ @parts ],
);
 
# Create the transport. Using gmail for this example
my $transport = Email::Sender::Transport::SMTP::TLS->new(
    host     => 'smtp.gmail.com',
    port     => 587,
    username => 'datdn@nal.vn',
    password => 'ngocdat7601_'
);
 
# send the mail
try {
       sendmail( $email_object, {transport => $transport} );
} catch {
       warn "Email sending failed: $_";
};