var express = require('express');
var router = express.Router();
// var signup = require('../models/signup.js');
var Signin = require('../controllers/signin');
var Signup = require('../controllers/signup');

/* Home Page Router. */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('SHvsMK');
});

/* Sign Up Router */

router.get('/signup', Signup.ShowSignupPage);
router.post('/signup', Signup.Signup);

/* Sign In Router */
router.get('/signin', Signin.ShowSigninPage);
router.post('/signin', Signin.Signin);

module.exports = router;
