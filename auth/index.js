var localStrategy = require('passport-local')
var sertvveterinary = require('sertvveterinary-client')
var jwt = require('jsonwebtoken')
var config = require('../config')

var client = sertvveterinary.createClient(config.client)

exports.localStrategy = new localStrategy ((username, password, done) => {
  client.auth(username, password, (err, token) => {
    if (err) {
      return done(null, false, {message: 'username or password not found'})
    }
    client.getUser(username, (err, user) => {
      if (err) {
        return done(null, false, {message: `and error occurred ${err.message}`})
      }

      user.token = token
      return done(null, user)
    })
  })
});

exports.serializeUser = function (user, done) {
  done (null, {
    username: user.username,
    token: user.token
  });
}

exports.deserializeUser = function (user, done) {
  client.getUser(user.username, (err, usr) => {
    if (err) return done(err)

    usr.token = user.token
    return done(null, usr)
  });
}