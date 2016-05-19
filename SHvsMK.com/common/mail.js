var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./../config');
var util = require('util');
var SITE_ROOT_URL = 'http://' + config.host;

var transporter = mailer.createTransport(smtpTransport(config.mailOptions));

var sendEmail = function(data) {
  console.log(data);
  transporter.sendMail(data, function(err) {
    if (err) {
      console.log(err);
    }
  });
};
exports.sendEmail = sendEmail;

exports.sendActiveEmail = function(who, token, name) {
  var from = util.format('%s <%s>', config.name, config.mailOptions.auth.user);
  var to = who;
  var subject = 'Active your account at SHvsMK.me';
  var html = '<p>Hi' + name + '</p>' +
    '<p> I received the you' + name + 'register an account at SHvsMK.me,' +
    'please click the following link to active your account:' +
    '<a href = "' + SITE_ROOT_URL + '/active_account?key=' + token + '&name=' + name + '">Active link</a>';
  exports.sendEmail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};
