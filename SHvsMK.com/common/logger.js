var log4js = require('log4js');
var config = require('./../config');

log4js.configure({
  appenders: config.log
});

var logger = log4js.getLogger();
module.exports = logger;
