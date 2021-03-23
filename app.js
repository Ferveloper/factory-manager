'use strict';

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment');

const apiRouter = require('./routes/api/api.router');

const app = express();

logger.token('moment', function () { return moment().format('DD/MM/YY HH:mm:ss.SSS');});
app.use(logger('[:moment] [REQ] :method :url :status :response-time ms - :res[content-length]'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  res.status(err.status || (err.response && err.response.status) || 500);
  res.json({
    success: false,
    message: err.message
  });
});

module.exports = app;
