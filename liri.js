var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
//==============================================================

var command = process.argv[2];
var tweets = require('./keys.js');
var keyMain = tweets.consumer_key;
var key = tweets.consumer_secret;
var accessKey = tweets.access_token_key;
var accessKeyS = tweets.access_token_secret;
//==============================================================

if (command === "my-tweets") {
    fs.appendFile("log.txt", "My Past Tweets:" + "\n");
    getTweets();
}

if (command === "spotify-this-song") {
    fs.appendFile("log.txt", "Spotify Song History:" + "\n");
    getSpotify();
}

if (command === "do-what-it-says") {
    getWhatItSays();
}

if (command === "movie-this") {
    fs.appendFile("log.txt", "Movie History:" + "\n");
    getMovie();
}

//Functions:
//==============================================================


function getMovie() {
    var movieName = encodeURIComponent(process.argv[3]);
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=40e9cece', function(error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log("");
            console.log("============================");
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie's release date: " + JSON.parse(body).Year);
            console.log("The movie's IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("============================");
            console.log("");

            fs.appendFile("log.txt", "The movie's title is: " + JSON.parse(body).Title + "\n");
            fs.appendFile("log.txt", "The movie's release date: " + JSON.parse(body).Year + "\n");
            fs.appendFile("log.txt", "The movie's IMDB rating: " + JSON.parse(body).imdbRating + "\n");
            fs.appendFile("log.txt", "The movie's Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value + "\n");
            fs.appendFile("log.txt", "Country where the movie was produced: " + JSON.parse(body).Country + "\n");
            fs.appendFile("log.txt", "Language: " + JSON.parse(body).Language + "\n");
            fs.appendFile("log.txt", "Plot: " + JSON.parse(body).Plot + "\n");
            fs.appendFile("log.txt", "Actors: " + JSON.parse(body).Actors + "\n");
            fs.appendFile("log.txt", "============================" + "\n");
        }
    });
}


function getWhatItSays() {
    fs.readFile('./random.txt', "utf8", function(err, data) {
        var spotify = new Spotify({
            id: 'd55c756a59a241e2904f6843dc67aa18',
            secret: 'Spotify Secret Here'
        });

        var data1 = data.split(",");
        var songName = data1[1];
        console.log(data);

        spotify.search({
            type: 'track',
            query: songName
        }, function(err, datainput) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("");
            console.log("============================");
            console.log("Artist Name: " + datainput.tracks.items[0].artists[0].name);
            console.log("Song Name: " + datainput.tracks.items[0].name);
            console.log("Preview Song Link: " + datainput.tracks.items[0].preview_url);
            console.log("Album Name: " + datainput.tracks.items[0].album.name);
            console.log("============================");
            console.log("");
        });
    });
}

function getSpotify() {
      var songName = process.argv[3];
      var spotify = new Spotify({
        id: 'd55c756a59a241e2904f6843dc67aa18',
        secret: 'Spotify Secret Here'
      });

      spotify.search({
        type: 'track',
        query: songName
      }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("");
        console.log("============================");
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Song Link: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("============================");
        console.log("");

        fs.appendFile("log.txt", "============================" + "\n");
        fs.appendFile("log.txt", "Artist Name: " + data.tracks.items[0].artists[0].name + "\n");
        fs.appendFile("log.txt", "Song Name: " + data.tracks.items[0].name + "\n");
        fs.appendFile("log.txt", "Preview Song Link: " + data.tracks.items[0].preview_url + "\n");
        fs.appendFile("log.txt", "Album Name: " + data.tracks.items[0].album.name + "\n");
        fs.appendFile("log.txt", "============================" + "\n");

    });
}

function getTweets() {
    var client = new Twitter({
        consumer_key: keyMain,
        consumer_secret: key,
        access_token_key: accessKey,
        access_token_secret: accessKeyS,
    });

    var options = {
        screen_name: 'Twitter Username Here',
        count: 20
    };

    client.get('statuses/user_timeline', options, function(err, data) {
        for (var i = 0; i < data.length; i++) {

            console.log("Tweet: " + data[i].text);
            console.log("Posted on: " + data[i].created_at);
            console.log("");
            console.log("============================");
            console.log("");

            fs.appendFile("log.txt", `Tweet: ${data[i].text}` + "\n", (err));
        }
    });
}
