var request = require('request')

// Fill these out
var consumer_key = ''
var consumer_secret = ''
var access_token = ''
var access_secret = ''

// Set these as well
var account_id = 0
var list_id = 0

var oauth = { consumer_key: consumer_key,
              consumer_secret: consumer_secret,
              token: access_token,
              token_secret: access_secret }

var subscribers_url = 'https://api.aweber.com/1.0/accounts/' + account_id + '/lists/' + list_id + '/subscribers'

// See for available parameters
// https://labs.aweber.com/docs/reference/1.0#subscriber_collection
var subscriber = {'ws.op': 'create', email: 'test@yourdomain.com'}

request.post({url: subscribers_url, 
             oauth: oauth, 
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(subscriber)}, 
             function (e, r, body) {
    console.log(body)
})
