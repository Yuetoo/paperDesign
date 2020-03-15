// test.js
module.exports = {
    mysql : {
      host: "localhost",
      user: "root",
      password: "123456",
      database: "paperdesign"
    },
    session: {
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 1000*60*60
        }
      }
  };