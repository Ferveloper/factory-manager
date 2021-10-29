'use strict';

const mongoose = require('mongoose');
const { mongoUrl } = require('../config/');

// Error or success console notifications
const db = mongoose.connection;
db.on('error', function () {
  console.error('Connection error');
  process.exit(1);
});
db.once('open', function () {
  console.log('MongoDB connection has been established successfully');
});

// Connecting to database
const connectMongoose = async function () {
  console.log('Connecting to MongoDB database...');
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};

module.exports = { connectMongoose, db };
