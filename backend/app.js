const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bearerToken = require('express-bearer-token');
const logger = require('morgan');

const routes = {
  indexRouter: require('./routes/index'),
};

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bearerToken({
  headerKey: 'Bearer',
  reqKey: 'token'
}));

app.use('/api', routes.indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = createError.NotFound();
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,

    // Only providing error in development
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
