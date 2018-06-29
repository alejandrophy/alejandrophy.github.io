<?php

	require_once('API/TwitterAPIExchange.php');

	$tweet = $_POST['text-tweet'];

	$settings = array(
	    'oauth_access_token' => "1012354410683527168-vYzIrkdncGmVbt5a4N7rIU0HohtFlP",
	    'oauth_access_token_secret' => "kQwyIhx78lZSk1wzAJlZeRsbjYTbBTZXBzcpvndLEJLY1",
	    'consumer_key' => "BNzdCfnOGjW1v7sqJXeAd3Cew",
	    'consumer_secret' => "qRSoJao5OupneqGKnvpfITH22nopDulDxAXltkebv6uhzdjMD7
"
	);
	$url = 'https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=popular';
	$requestMethod = 'GET';
	$postfields = array('status' => $tweet);
	$twitter = new TwitterAPIExchange($settings);
	$response =  $twitter->buildOauth($url, $requestMethod)
                 ->setPostfields($postfields)
                 ->performRequest();

    echo '<script>clearform();</script>';
?>
