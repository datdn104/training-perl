#!/usr/bin/perl -w
use lib qw(/home/vagrant/perl5/lib/perl5);
use CGI::Carp 'fatalsToBrowser';
use LWP::UserAgent;
use HTML::Parse;
use Data::Dumper;
use JSON;
use CGI;

my $cgi = CGI->new;
print $cgi->header(-type => "application/json", -charset => "utf-8");

# define a URL
my $url = 'http://vnexpress.net/';
my $ua = new LWP::UserAgent;
$ua->timeout(15);

# proceed the request:
my $request = HTTP::Request->new('GET');
$request->url($url);

my $response = $ua->request($request);
my $code = $response->code;
# my $headers = $response->headers_as_string;

print qq{{status: $code}} and exit unless $code == 200;

my $body =  $response->content;
my $parsed_html = HTML::Parse::parse_html($body);
my $ul = $parsed_html->find_by_attribute('id', 'menu_web');

print qq{{error: "Item not exist!"}} and exit unless $ul;

my %result = (status => $code);
my @data = ();

foreach my $a ($ul->find('a')) {
	my $title = $a->as_text();
	my $url = $a->attr('href');
	$url = "http://vnexpress.net" . $url unless $url =~ /http:\/\//;
	push(@data, {title => $title, url => $url});
}
$result{data} = [@data];

print to_json(\%result, {utf8 => 1, pretty => 1})