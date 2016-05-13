var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./../config');

var transporter = mailer.createTransport(smtpTransport(config.mailOptions));

var sendEmail = function(data) {
  transporter
};

exports.sendActiveEmail = function(who, token, name) {

};
