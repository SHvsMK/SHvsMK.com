var validator = require('validator');
var proxy = require('../proxy');
var User = proxy.User;

exports.ShowSignupPage = function(req, res) {
  res.render('Signup');
}

exports.Signup = function(req, res) {
  var username = validator.trim(req.body.username);
  var email = validator.trim(req.body.email);
  var password = validator.trim(req.body.password);
  var confirm_password = validator.trim(req.body.confirm_password);
  // res.send('hello');

  // var username = req.body.username;
  // var email = req.body.email;
  // var password = req.body.password;
  // var confirm_password = req.body.confirm_password;

  console.log(username);
  console.log(email);
  console.log(password);
  console.log(confirm_password);
  User.getUserByQuery({'$or': [
    { 'username': username },
    { 'email': email }
  ]}, {}, function(err, user) {
    if (err) {
      console.log(1);
      console.log(err);
      return;
    }
    if (user.length > 0) {
      return;
    }

    console.log('yes');

    User.newAndSave(username, email, password, false, function(err) {
      if (err) {
        console.log(2);
        console.log(err);
        return;
      }
      res.send('yes');
    });
  });
};
