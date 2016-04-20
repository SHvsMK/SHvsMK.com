var express = require('express');
var router = express.Router();
var signup = require('../models/signup.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
  // var username = req.body.username;
  // var password = req.body.password;
  var newuser = new signup({
    name : req.body.username,
    password : req.body.password
  });
  newuser.save(function(err, user){
    if (err) {
      console.log(err);
    }
    console.log('yes');
  });
  console.log(res);
  res.send('OK');
})

module.exports = router;
