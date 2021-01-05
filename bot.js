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


















//---------------------------------------------f
// //config openweather api for LV
// weather.setLang('en');
// weather.setCityId(5506956); //Las Vegas city code
// weather.setUnits('imperial');
// weather.setAPPID('a2fd6266b5ee4bb303a0f3324d95ec4f');
//
// //Get Data for LV Weather
//
// weather.getWeatherForecastForDays(3, function(err, obj) {
//   console.log(obj);
// });


//-------------------------------------------------------

//Setting up a user stream
// var stream = T.stream('statuses/filter', { track: '@123Astb' }); //stream has been depreciated smh
//
// //Anytime someone follows me
// stream.on('follow', followed);
//
// function followed(eventMsg) {
//   console.log("Follow Event!");
//   var name = eventMsg.source.name;
//   var screenName = eventMsg.source.screen_name;
//   tweetIt('@' + screenName + ' Thanks for following!');
// }



//Tweeting (w/ intervals[optional])
//tweetIt();
//setInterval(tweetIt, 1000*20); //tweet every [20] seconds

// function tweetIt(txt) { //txt is taken from the followed() function and then placed into the status parameter
//   var r = Math.floor(Math.random() * 100);
//
//   var tweet = {
//     //status: "Here is a random number: " + r; //this is the actual content of the tweet being tweeted
//     status: txt //This is where the text from the followed function() is placed to become the data for the tweet
//   }
//
//   T.post('statuses/update', tweet, tweeted)
//
//   function tweeted(err, data, response) {
//     if(err) {
//       console.log("something went wrong");
//     } else {
//       console.log("It worked!");
//       console.log(data);
//     }
//   }
// }
//
// // Querying Tweets (reference API doc for more params)
// function getIt() {
//   var params = {
//     q: 'rainbow',
//     count: 2,
//     result_type: 'popular'
//   }
//
//   T.get('search/tweets', params, gotData);
//
//   function gotData (err, data, response) {
//     var tweets = data.statuses;
//     for (var i = 0; i < tweets.length; i++) {
//       console.log(tweets[i].text + "//");
//     }
//   };
// }
