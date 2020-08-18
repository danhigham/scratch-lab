/**
 * PassportController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var passport = require('passport');
var async = require('async');

module.exports = {
  
  googleAuth: function(req, res) {
    console.log("Authenticating with google");
    passport.authenticate('google', { scope: ['email', 'profile'] })(req, res);
  },

  googleCallback: function(req, res, next) {
    var _req = req;
    passport.authenticate('google', async function(err, user) {
      if(err) {
        // redirect to login page
        console.log('google callback error: '+err);
      } else {

        console.log('google credentials');
        console.log(user);

        var userRecord = await User.findOne({
          emailAddress: user.email,
        });
    
        if (!userRecord) {
          userRecord = await createUser(user, req);
        }

        _req.session.userId = userRecord.id;
        _req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;

        res.redirect('/');
      }
    })(req, res, next);
  }

 

};

var createUser = async function(user, req) {
  var newUserRecord = await User.create(_.extend({
    emailAddress: user.email,
    password: await sails.helpers.passwords.hashPassword(user.id),
    fullName: user.name,
    oAuthUserID: user.id,
    tosAcceptedByIp: req.ip
  }, sails.config.custom.verifyEmailAddresses? {
    emailProofToken: await sails.helpers.strings.random('url-friendly'),
    emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
    emailStatus: 'unconfirmed'
  }:{}))
  .intercept('E_UNIQUE', 'emailAlreadyInUse')
  .intercept({name: 'UsageError'}, 'invalid')
  .fetch();

  return newUserRecord;
}