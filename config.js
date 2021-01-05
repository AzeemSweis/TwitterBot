module.exports = {
  //twitter api configs
  consumer_key:         ['YOUR CONSUMER KEY'],
  consumer_secret:      ['YOUR CONSUMER SECRET KEY'],
  access_token:         ['YOUR ACCESS TOKEN'],
  access_token_secret:  ['YOUR CONSUMER SECRET TOKEN'],
  //timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  //strictSSL:            true,     // optional - requires SSL certificates to be valid.

  //openweather api configs
  apiLink: 'https://api.openweathermap.org/data/2.5/onecall?',
  lat: ['lat=', '36.11464'],
  lon: ['&lon=', '-115.172813'],
  units: ['&units=','imperial'],
  exclude: ['&exclude=', 'minutely,hourly'],
  appID: ['&appid=', 'YOUR OPENWEATHER API KEY']
}
