var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');

var getMyTweets = function() {

	var client = new Twitter(keys.twitterKeys);
 
	var params = {screen_name: 'nycyoo350'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
    		for(var i = 0; i < tweets.length; i++) {
    			console.log(tweets[i].created_at)
    			console.log(' ');
    			console.log(tweets[i].text);
			}
 		 }
	});

}
 
var getMeSpotify = function(songName) {
	var spotify = new Spotify({
  id: '55a6d0eb1be34ae7b9ebcb9b05450f37',
  secret: '9de0160bb7f44f01ae3489b2bf8cb767'
});

	spotify.search({ type: 'track', query: songName }, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	}
 
 		var songs = data;
 		console.log(songs);
 		for(var i = 0; i < songs.length; i++) {
 			console.log(i);
 			console.log('artist(s)' + songs[i].artists.map(getArtistNames));
 			console.log('song name: ' + songs[i].name);
 			console.log(' preview song: ' + songs[i].preview_url);
 			console.log('album: ' + songs[i].album.name);
 			console.log('----------------------------------------------------');
 		}
	});
}

var getMeMovie = function(movieName) {
request('http://www.omdbapi.com/?apikey=[807f53b9]&?t= ' + movieName + 
	'&y=&plot=short&r=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	var jsonData = JSON.parse(body);

  	console.log('Title: ' + jsonData.Title);
  	console.log('Year: ' + jsonData.Year);
  	console.log('Plot: ' + jsonData.Plort);
  	console.log(' Rotten tomatose URL: ' + jsonData.tomatoURL);
  }
});
}

var doWhatItSays = function() {

fs.readFile('random.txt', 'utf8', function (err, data) {
	if(err) throw err;
	var dataArr = data.split(',');

	if (dataArr.length == 2) {
		pick(dataArr[0], dataArr[1]);
	} else if (dataArr.length ==1) {
		pick(dataArr[0]);
	}
});
}

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets':
			getMyTweets();
			break;
		case 'spotify-this-song':
			getMeSpotify(functionData);
			break;
		case 'movie-this':
			getMeMovie(functionData);
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
		console.log('LIRI does not know that');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
 
