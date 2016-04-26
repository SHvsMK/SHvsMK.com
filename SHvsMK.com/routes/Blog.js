var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('Blog');
});

router.get('/Code', function(req, res, next) {
  res.render('Code');
});

router.get('/Food', function(req, res, next) {
  res.render('Food');
});

router.get('/Travel', function(req, res, next) {
  res.render('Travel');
});

router.get('/Photo', function(req, res, next) {
  res.render('Photo');
});

module.exports = router;
