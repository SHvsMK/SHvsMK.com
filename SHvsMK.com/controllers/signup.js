var validator = require('validator');
var proxy = require('../proxy');
var User = proxy.User;
var jwt = require('jsonwebtoken');
var config = require('./../config')

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
      var token = jwt.sign({username: username}, config.secret, {expiresIn: 30});
      res.json({
        success: true,
        message: "Sign up successfully!",
        token: token
      });
    });
  });
};
