var express = require('express');
var router = express.Router();
var signup = require('../models/signup.js');

/* Home Page Router. */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('SHvsMK');
});

/* POST home page. */
// router.post('/', function(req, res) {
// })

module.exports = router;
