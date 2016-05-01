var models = require('../models');
var User = models.User;


exports.getUserByUsername = function(username, callback) {
  if (username.length === 0) {
    return callback(null, []);
  }
  User.find({ username: username }, callback);
};

exports.getUserByEmail = function(email, callback) {
  if (email.length === 0) {
    return callback(null, []);
  }
  User.find({ email: email }, callback);
};

exports.getUserByQuery = function(query, opt, callback) {
  User.find(query, '', opt, callback);
};

exports.newAndSave = function(username, email, password, active, callback) {
  var user = new User();
  user.username = username;
  user.email = email;
  user.password = password;
  user.active = active || false;

  user.save(callback);
};
