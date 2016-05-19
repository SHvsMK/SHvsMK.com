var validator = require('validator');
var proxy = require('../proxy');
var User = proxy.User;
var jwt = require('jsonwebtoken');
var config = require('./../config')
var mail = require('../common/mail');
var utility = require('utility');

exports.ShowSignupPage = function(req, res) {
  res.render('Signup');
};

exports.Signup = function(req, res) {
  var username = validator.trim(req.body.username);
  var email = validator.trim(req.body.email);
  var password = validator.trim(req.body.password);
  var confirm_password = validator.trim(req.body.confirm_password);

  User.getUserByQuery({'$or': [
    { 'username': username },
    { 'email': email }
  ]}, {}, function(err, user) {
    if (err) {
      res.json({
        success: false,
        message: err
      });
      return;
    }
    if (user.length > 0) {
      res.json({
        success: false,
        message: "Username or email has been used!",
      });
      return;
    }
    User.newAndSave(username, email, password, false, function(err) {
      if (err) {
        res.json({
          success: false,
          message: err
        });
        return;
      }
      mail.sendActiveEmail(email, utility.md5(email + password + config.secret), username);
      var token = jwt.sign({username: username}, config.secret, {expiresIn: 30});
      res.json({
        success: true,
        message: "Sign up successfully!",
        token: token
      });
    });
  });
};

exports.ActiveAccount = function(req, res) {
  var key = req.query.key;
  var name = req.query.name;

  User.getUserByUsername(name, function(err, user) {
    if (err) {
      console.log(err);
      return;
    }
    if (!user) {
      console.log('No such user!');
      return;
    }
    console.log(user);
    console.log(user.email);
    console.log(user.password);
    console.log(config.secret);
    console.log(utility.md5(user.email + user.password + config.secret));
    if (utility.md5(user.email + user.password + config.secret) !== key) {
      console.log("Wrong Information");
      return;
    }
    if (user.active) {
      console.log("User has been actived!");
      return;
    }
    user.active = true;
    user.save(function(err) {
      if (err) {
        console.log(err);
        return;
      }
      res.render('SHvsMK');
    });

  });
};
