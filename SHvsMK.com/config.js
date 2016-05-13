var config = {

  // mongodb config
  // name: 'test',
  // host: 'localhost',
  // port: '27017'
  db: 'mongodb://127.0.0.1/test',
  secret: 'SHvsMK',

  mailOptions: {
    host: 'smtp.gmail.com',
    port: 25,
    auth: {
      user: 'shvsmkweb@gmail.com',
      pass: '65808228'
    }
  }

};

module.exports = config;
