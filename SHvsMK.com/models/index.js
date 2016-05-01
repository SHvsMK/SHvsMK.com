var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, function(err) {
  if (err) {
    console.log('Mongodb connections fails!');
  }
});

require('./user');

exports.User = mongoose.model('User');
