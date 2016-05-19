var config = {

  name: 'SHvsMK',
  host: 'localhost:3000',
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
  },

  redis: {
    host: '127.0.0.1',
    port: 6379,
  }

};

module.exports = config;
