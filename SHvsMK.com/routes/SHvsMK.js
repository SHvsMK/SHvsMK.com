var express = require('express');
var router = express.Router();
// var signup = require('../models/signup.js');
var Signin = require('../controllers/signin');
var Signup = require('../controllers/signup');
var Blog = require('../controllers/blog');
var Code = require('../controllers/code');
var Food = require('../controllers/food');
var Travel = require('../controllers/travel');
var Photo = require('../controllers/photo');
var ChattingRoom = require('../controllers/chattingroom');

/* Home Page Router. */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('SHvsMK');
});

/* Sign Up Router */

router.get('/signup', Signup.ShowSignupPage);
router.post('/signup', Signup.Signup);
router.get('/active_account', Signup.ActiveAccount);

/* Sign In Router */
router.get('/signin', Signin.ShowSigninPage);
router.post('/signin', Signin.Signin);

/* Blog Router */
router.get('/blog', Blog.ShowBlogPage);

router.get('/blog/code', Code.ShowCodePage);

router.get('/blog/food', Food.ShowFoodPage);

router.get('/blog/travel', Travel.ShowTravelPage);

router.get('/blog/photo', Photo.ShowPhotoPage);

router.get('/chattingroom', ChattingRoom.ShowChattingRoomPage);
router.post('/chattingroom', ChattingRoom.CheckUserInfo);


module.exports = router;
