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
my $url = 'http://vnexpress.net/tin-tuc/thoi-su';
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
my $ul = $parsed_html->find_by_attribute('id', 'news_home');
my $div_hot_new = $parsed_html->find_by_attribute('class', 'box_hot_news');

print qq{{error: "Item not exist!"}} and exit unless $ul;

my %result = (status => $code);
my @data = ();

if($div_hot_new){
	my %hot_new = ();

	my $a = $div_hot_new->find('a');
	if($a){
		$hot_new{url} = $a->attr('href');
		my $img = $a->find('img');
		$hot_new{img} = $img->attr('src') if $img;
	}

	my $div_title = $div_hot_new->find_by_attribute('class', 'title_news');
	$hot_new{title} = $div_title->as_text() if $div_title;

	my $div_news_lead = $div_hot_new->find_by_attribute('class', 'news_lead');
	$hot_new{short_description} = $div_news_lead->as_text() if $div_news_lead;

	$result{hot_new} = {%hot_new};
}

foreach my $li ($ul->find('li')) {
	my %paper = ();

	my $div_thumb = $li->find_by_attribute('class', 'thumb');
	if($div_thumb){
		my $img = $div_thumb->find('img');
		$paper{img} = $img->attr('src') if $img;
	}

	my $a = $li->find('a');
	if($a){
		$paper{url} = $a->attr('href');
		$paper{title} = $a->as_text();
	}

	my $div = $li->find_by_attribute('class', 'news_lead');
	$paper{short_description} = $div->as_text() if $div;

	push(@data, {%paper});
}

$div_pagination = $parsed_html->find_by_attribute('id', 'pagination');
if($div_pagination){
	$img_next = $div_pagination->find_by_attribute('alt', 'Next');
	$result{next_page} = 'http://vnexpress.net/' . $img_next->parent()->attr('href') if $img_next;

	$img_prev = $div_pagination->find_by_attribute('alt', 'Prev');
	$result{next_page} = 'http://vnexpress.net/' . $img_prev->parent()->attr('href') if $img_prev;
}

$result{list_paper} = [@data];

print to_json(\%result, {utf8 => 1, pretty => 1})