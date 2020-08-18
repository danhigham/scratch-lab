'use strict';

var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth2').Strategy;

//var verifyHandler = function(req, token, tokenSecret, profile, done) {
var verifyHandler = function (accessToken, refreshToken, profile, cb, done) {

  var data = {
    id: cb.id,
    name: cb.displayName,
    email: cb.emails[0].value,
    emailVerified: cb.emails[0].verified
  };

  return done(null, data);
};

passport.use(new GoogleStrategy({
  clientID: '775867095220-rt9frtf60s7n5iujugt87qnqpi8qov81.apps.googleusercontent.com',
  clientSecret: 'R0671ea7hECboYJAetkjvZSy',
  callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
  passReqToCallback: true
}, verifyHandler));
