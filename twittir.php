<?php
require_once('TwitterAPIExchange.php');

$settings = array(
       'oauth_access_token' => "1012354410683527168-vYzIrkdncGmVbt5a4N7rIU0HohtFlP",
	    'oauth_access_token_secret' => "kQwyIhx78lZSk1wzAJlZeRsbjYTbBTZXBzcpvndLEJLY1",
	    'consumer_key' => "BNzdCfnOGjW1v7sqJXeAd3Cew",
	    'consumer_secret' => "qRSoJao5OupneqGKnvpfITH22nopDulDxAXltkebv6uhzdjMD7"
);


$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
 
$requestMethod = "GET";
 
$getfield = '?screen_name=iagdotme&count=20';
 
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();


if($string["errors"][0]["message"] != "") {echo "<h3>Sorry, there was a problem.</h3><p>Twitter returned the following error message:</p><p><em>".$string[errors][0]["message"]."</em></p>";exit();}
foreach($string as $items)
    {
        echo "Time and Date of Tweet: ".$items['created_at']."<br />";
        echo "Tweet: ". $items['text']."<br />";
        echo "Tweeted by: ". $items['user']['name']."<br />";
        echo "Screen name: ". $items['user']['screen_name']."<br />";
        echo "Followers: ". $items['user']['followers_count']."<br />";
        echo "Friends: ". $items['user']['friends_count']."<br />";
        echo "Listed: ". $items['user']['listed_count']."<br /><hr />";
    }
 echo "fin"
?>
