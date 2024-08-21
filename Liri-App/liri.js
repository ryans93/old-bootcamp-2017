var keys = require("./twitter-keys.js");
var twitter = keys.twitterKeys;
var keys2 = require("./spotify-keys.js");
var spotifyIDs = keys2.spotifyKeys;
var random;

var option = process.argv[2];
var query=process.argv[3];

runLiri();

function runLiri(){
if (option === "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) console.log("Error: file not found.");
        random=data.split(",");
        option=random[0];
        query=random[1];
        runLiri();
    })
}

if (option === "my-tweets") {
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: twitter.consumer_key,
        consumer_secret: twitter.consumer_secret,
        access_token_key: twitter.access_token_key,
        access_token_secret: twitter.access_token_secret
    });

    var params = { screen_name: 'ryanstrickler5' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            count = tweets.length;
            for (var i = 0; i < 20 && count > 0; i++) {
                console.log(tweets[i].text + " " + tweets[i].created_at);
                count--;
            }
        }
        else console.log(error);
    });
}

if (option === "spotify-this-song") {
    if (query === undefined) {
        query = "The Sign Ace of Base";
    }

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: spotifyIDs.client_id,
        secret: spotifyIDs.client_secret
    });

    spotify.search({ type: 'track', query: query }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview URL: "
            + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
    });
}

if (option === "movie-this") {
    var request = require('request');
    if(query===undefined){
        query="Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl,function (error, response, body) {
        var movie=JSON.parse(body);
        console.log("Title: "+movie.Title+"\nYear: "+movie.Year+"\nIMDB Rating: "+movie.imdbRating+
        "\nRotten Tomatoes Rating: "+movie.Ratings[1].Value+"\nProduced In: "+movie.Country+
        "\nLanguages: "+movie.Language+"\nPlot: "+movie.Plot+"\nActors: "+movie.Actors);
    });
}
}
