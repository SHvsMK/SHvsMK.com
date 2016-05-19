var proxy = require('../proxy');
var User = proxy.User;
var jwt = require('jsonwebtoken');
var config = require('./../config');
var redis = require('../common/redis').redis;
var redisClient = require('../common/redis').redisClient;
var logger = require('../common/logger');

exports.ShowSigninPage = function(req, res) {
  var location = req.headers['referer'];

  if(location) {
    location = location.substring(location.lastIndexOf('/'));
  } else {
    location = '/';
  }

  res.render('Signin', {location: location});
};

exports.Signin = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.checkUser(username, password, function(err, user) {
    if (err) {
      res.json({
        success: false,
        message: err
      });
      return;
    }
    if(user.length > 0) {
      var token = jwt.sign({username: username}, config.secret, {expiresIn: "1h"});
      redisClient.set(token, true, redis.print);
      res.json({
        success: true,
        message: "Sign in successfully!",
        token: token
      });
    } else {
      res.json({
        success: false,
        message: "Username or password wrong!"
      });
    }
  });
};
