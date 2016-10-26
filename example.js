var request = require('request')

// Fill these out
var consumer_key = ''
var consumer_secret = ''
var access_token = ''
var access_secret = ''

var accounts_url = 'https://api.aweber.com/1.0/accounts'

var oauth = { consumer_key: consumer_key,
              consumer_secret: consumer_secret,
              token: access_token,
              token_secret: access_secret }

request.get({url:accounts_url, oauth:oauth}, function (e, r, body) {
    console.log(body)
})
