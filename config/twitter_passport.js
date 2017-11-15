// TWITTER =============================================
var TwitterStrategy = require('passport-twitter').Strategy;

function twitter_passport(User, passport, configAuth) {
    console.log('doing twitter passport');
    var config = {
                    consumerKey: configAuth.twitterAuth.consumerKey,
                    consumerSecret: configAuth.twitterAuth.consumerSecret,
                    callbackURL: configAuth.twitterAuth.callbackURL,
                    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
                };
    passport.use(new TwitterStrategy(config,
        function (req, token, tokenSecret, profile, done) {
            console.log(profile);
            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({
                        'twitter.id': profile.id
                    }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.twitter.token) {
                                create_twitter_token(user, token, profile, done);
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser = new User();

                            register_user(newUser, token, profile, done);
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                   register_user(user, token, profile, done);
                }

            });

        }));
}
module.exports = twitter_passport;

function create_twitter_token(user, token, profile, done) {
    user.twitter.token = token;
    user.twitter.username = profile.username;
    user.twitter.displayName = profile.displayName;

    user.save(function (err) {
        if (err)
            throw err;
        return done(null, user);
    });
}
function register_user(User, token, profile, done) {
    User.twitter.id = profile.id;
    User.twitter.token = token;
    User.twitter.username = profile.username;
    User.twitter.displayName = profile.displayName;

    User.save(function (err) {
        if (err)
            throw err;
        return done(null, User);
    });
}