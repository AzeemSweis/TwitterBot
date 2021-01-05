console.log("The bot is online!");

var request = require('request');
var Twit = require("twit");
var config = require("./config");


//config twitter api
var T = new Twit(config);

var currentTemp;
var minTemp;
var maxTemp;
var hum;
var desc;
var windSpeed;
var url = config.apiLink + config.city + config.appID[0] +
config.appID[1] + config.units[0] + config.units[1];

getData();
setInterval(getData, 1000*60*60*12);


function getData() {
  request({url:url, json:true}, function(err, response, body) {
    if(!err && response.statusCode === 200) {
      currentTemp = body.main.temp;
      minTemp = body.main.temp_min;
      maxTemp = body.main.temp_max;
      hum = body.main.humidity;
      windSpeed = body.wind.speed;
      desc = body.weather[0].description;
      CleanData();
      console.log("Data Recieved");
    } else {
      console.log("getData error triggered");
      console.log(err);
    }
  })
}

function CleanData() {
  currentTemp = currentTemp.toFixed(0);
  minTemp = minTemp.toFixed(0);
  maxTemp = maxTemp.toFixed(0);
  Tweet();
}

function Tweet() {
  var weatherUpdate = config.city +
  " Daily Forecast: low of " + minTemp +
  "°F with high of " + maxTemp +
  "°F, humidity at " + hum +
  "%, and windspeed of " + windSpeed +
  " mph."+ "\n\n" + "Currently " + desc +
  " at " + currentTemp + "°F." +
  "\n" + "#LasVegas #LasVegasWeather"

  var tweet = {
    status: weatherUpdate
  }

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if(err) {
      console.log("something went wrong");
      console.log(err);
    } else {
      console.log("It worked! \n" + weatherUpdate);
    }
  }
}
