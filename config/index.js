'use strict';

const config = {
  expressPort: process.env.EXPRESS_PORT,
  mongoUrl: process.env.MONGO_URL
};

console.log('CONFIG', config);

module.exports= config;
