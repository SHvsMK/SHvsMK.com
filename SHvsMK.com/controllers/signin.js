var proxy = require('../proxy');
var User = proxy.User;
var jwt = require('jsonwebtoken');
var config = require('./../config');

exports.ShowSigninPage = function(req, res) {
  res.render('Signin');
  return;
};

exports.Signin = function(req, res) {
  res.send("hello");
}

exports.Signin = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);

  User.checkUser(username, password, function(err, user) {
    console.log("yes");
    console.log(err);
    if (err) {
      console.log(err);
      res.json({
        success: false,
        message: err
      });
      console.log(err);
      return;
    }
    console.log("herer");
    if(user.length > 0) {
      console.log("helloherer");
      var token = jwt.sign({username: username}, config.secret, {expiresIn: 30});
      res.json({
        success: true,
        message: "Sign in successfully!",
        token: token
      });
    } else {
      console.log("no");
      res.json({
        success: false,
        message: "Username or password wrong!"
      });
    }
  });
};
