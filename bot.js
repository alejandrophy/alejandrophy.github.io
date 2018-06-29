
var Twit = require('twit');
var config = require('./configure');
var T = new Twit(config);

T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, gotData)


function gotData(err, data, response) {
	var tweets= data.statuses;
	for(var i=0; i<tweets.length; i++){
  console.log(tweets[i].text)
  }
}
