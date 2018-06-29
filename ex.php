<?php

    $jsondata = array();

    $jsondata['success'] = false;
    $jsondata['message'] = 'Hola! El valor recibido no es correcto.';

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
    $response =$twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
$jsondata['algo'] = $response ;


    

    //Aunque el content-type no sea un problema en la mayoría de casos, es recomendable especificarlo
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($jsondata);
    exit();

?>
