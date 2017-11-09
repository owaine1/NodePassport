// app/routes.js
module.exports = function (app, passport) {
    console.log('loaded routes');

    var local_routes = require('./local_routes');
    local_routes(app, passport);

    var facebook_routes = require('./facebook_routes');
    facebook_routes(app, passport);

    var twitter_routes = require('./twitter_routes');
    twitter_routes(app, passport);

    var google_routes = require('./google_routes');
    google_routes(app, passport);

    // HOME PAGE (with login links) ========
    app.get('/', function (req, res) {
        console.log('getting index.ejs');
        res.render('index.ejs'); // load the index.ejs file
    });

    // PROFILE SECTION =====================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        console.log('getting profile');
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}