var models = require('../models');
var User = models.User;


exports.getUserByUsername = function(username, callback) {
  if (username.length === 0) {
    return callback(null, []);
  }
  User.findOne({ username: username }, callback);
};

exports.getUserByEmail = function(email, callback) {
  if (email.length === 0) {
    return callback(null, []);
  }
  User.findOne({ email: email }, callback);
};

exports.comparePassword = function(password, confirm_password, callback) {

}

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

exports.checkUser = function(username, password, callback) {
  User.find({'$and': [
    { username: username },
    { password: password }
  ]}, callback);
}

exports.updateByQuery = function(query, opt, callback) {
  User.update(query, opt, callback);
}
