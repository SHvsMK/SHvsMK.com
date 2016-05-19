var redis = require('redis');
var config = require('./../config');

var redisClient = redis.createClient(config.redis);

redisClient.on('error', function(err) {
  console.log('Error ' + err);
});

redisClient.on('connect', function(err) {
  console.log('Redis is ready');
});

exports.redis = redis;
exports.redisClient = redisClient;
