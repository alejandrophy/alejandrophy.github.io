
var Twit = require('twit');
var config = require('./configure');
var T = new Twit(config);

T.get('search/tweets', { q: 'Colombia since:2018-06-25', count: 1000 }, gotData)


function gotData(err, data, response) {
	var tweets= data.statuses;
	for(var i=0; i<tweets.length; i++){
  console.log(i+") "+tweets[i].user.name+' : '+ tweets[i].user.location)
  console.log('---------------------------------------')
  }
}

var stream = T.stream('statuses/filter', { track: '#Colombia', language: 'en' })

stream.on('tweet', function (tweet) {
  var tweets= tweet.statuses;
	for(var i=0; i<tweets.length; i++){
  console.log(i+") "+tweets[i].user.name+' : '+ tweets[i].user.location)
  console.log('---------------------------------------')
			}
})
