var jwt = require('jsonwebtoken');
var config = require('./../config');

exports.ShowChattingRoomPage = function(req, res){
  res.render('ChattingRoom');
};

exports.CheckUserInfo = function(req, res) {
  var token = (req.query && req.query.token) || req.headers['x-access-token'] || (req.body && req.body.token);

  if(token) {
    jwt.verify(token, config.secret, function(err, decode) {
      if (err) {
        res.json({
          success: false,
          message: err
        });
      } else {
        res.json({
          success: true,
          message: 'Welcome to SHvsMK ChattingRoom!',
          username: decode.username
        })
      }
    });
  } else {
    res.json({
      success: false,
      message: 'Please sign in first!'
    });
  }
}
