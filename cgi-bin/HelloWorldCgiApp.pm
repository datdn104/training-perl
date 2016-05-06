# HelloWordCgiApp.pm
package HelloWorldCgiApp;
use lib qw(/home/vagrant/perl5/lib/perl5);
use base 'CGI::Application';
use HTML::Template;
use strict;

# Run at startup
sub setup {
    my $self = shift;
    $self->start_mode('mode1');
    $self->run_modes('mode1' => 'helloworld_cgi_app', 'mode2' => 'helloperl_cgi_app_1');
    $self->tmpl_path('./');
}

sub helloworld_cgi_app {
    my $self = shift;
    my $that_famous_string = 'Hello, world!';
    my $template = $self->load_tmpl('helloworld.tmpl.html', cache => 1);
    $template->param( THAT_FAMOUS_STRING => $that_famous_string, );
    my $html_output = $template->output;
    return $html_output;
}

sub helloperl_cgi_app_1 {
    my $self = shift;
    my $that_famous_string = 'Hello, perl!';
    my $template = $self->load_tmpl('helloworld.tmpl.html', cache => 1);
    $template->param( THAT_FAMOUS_STRING => $that_famous_string, );
    my $html_output = $template->output;
    return $html_output;
}

1;