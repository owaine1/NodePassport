// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': '742274825964731', // your App ID
        'clientSecret': '18879311f155583f4ffe51d626d0720f', // your App Secret
        'callbackURL': 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth': {
        'consumerKey': 'JrSeQF7nTgZAV6Tm4sTFvKURE',
        'consumerSecret': 'ZMH79kldYlrBly3pJiCOdnk0ducUMmVPwnRyow0UKQKDVgm4vM',
        'callbackURL': 'http://127.0.0.1:8080/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': '372885609654-ve2n820nogud0sks32lauk9inq6lqrop.apps.googleusercontent.com',
        'clientSecret': 'xkYD-VhFi_vn2Guk-jUxM3C6',
        'callbackURL': 'http://127.0.0.1:8080/auth/google/callback'
    },
    'windows': {
        'clientID': '372885609654-ve2n820nogud0sks32lauk9inq6lqrop.apps.googleusercontent.com',
        'clientSecret': 'xkYD-VhFi_vn2Guk-jUxM3C6',
        'callbackURL': 'http://127.0.0.1:8080/auth/google/callback'
    },
};