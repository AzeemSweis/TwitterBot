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
var url = config.apiLink + config.lat[0] + config.lat[1] + config.lon[0] +
config.lon[1] + config.units[0] + config.units[1] + config.exclude[0] +
config.exclude[1] + config.appID[0] + config.appID[1];

getDataCurrent();
setInterval(getData, 1000*60*60*12);


function getDataCurrent() {
  request({url:url, json:true}, function(err, response, body) {
    if(!err && response.statusCode === 200) {
      currentTemp = body.current.temp;
      minTemp = body.daily[0].temp.min;
      maxTemp = body.daily[0].temp.max;
      hum = body.current.humidity;
      windSpeed = body.current.wind_speed;
      desc = body.current.weather[0].description;
      CleanData();
      console.log("Current data Recieved");
      //console.log(body);
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

  var weatherUpdate = "In Las Vegas:" +
  " Currently " + desc + ", at " + currentTemp +
  "°F, with humidity at " + hum +
  "%, windspeed of " + windSpeed +
  "mph.\n\n" + "Forecast: High is " + maxTemp +
  "°F, and low is " + minTemp + "°F"
  "\n" + "#LasVegas #LasVegasWeather"

  console.log(weatherUpdate);

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
