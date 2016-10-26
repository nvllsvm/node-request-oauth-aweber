var qs = require('querystring')
var prompt = require('prompt')
var request = require('request')

// These can both be found in your AWeber Lab's account.
var consumer_key = ''
var consumer_secret = ''

var request_url = 'https://auth.aweber.com/1.0/oauth/request_token'
var authorize_url = 'https://auth.aweber.com/1.0/oauth/authorize'
var access_url = 'https://auth.aweber.com/1.0/oauth/access_token'

var request_oauth = { callback: 'http://localhost',
                    consumer_key: consumer_key,
                    consumer_secret: consumer_secret }

request.post({url:request_url, oauth:request_oauth}, function (e, r, body) {
    var req_data = qs.parse(body)
    var uri = authorize_url + '?' + qs.stringify({oauth_token: req_data.oauth_token})

    console.log('Go here: ' + uri)

    prompt.start()
    console.log('Enter the querystring of the redirect (after ?): ')
    prompt.get(['querystring'], function (err, result) {
        var auth_data = qs.parse(result.querystring)
        var step2_oauth = { consumer_key: consumer_key,
                            consumer_secret: consumer_secret,
                            token: auth_data.oauth_token,
                            token_secret: req_data.oauth_token_secret,
                            verifier: auth_data.oauth_verifier }
        request.post({url:access_url, oauth:step2_oauth}, function (e, r, body) {
            console.log(body)
            console.log(access_url)
            var perm_data = qs.parse(body)
            var access_oauth = { consumer_key: consumer_key,
                                 consumer_secret: consumer_secret,
                                 token: perm_data.oauth_token,
                                 token_secret: perm_data.oauth_token_secret }
            access_token = perm_data.oauth_token
            access_secret = perm_data.oauth_token_secret
            console.log('Access Token:  ' + access_token)
            console.log('Access Secret: ' + access_secret)
        })
    })
})
