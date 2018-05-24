const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Load routes into variables
const index = require('./routes/index');
const users = require('./routes/users');
const calendars = require('./routes/calendars');
const events = require('./routes/events');

const app = express();

// Template engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Generic application setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure routes in Express webserver
app.use('/', index);
app.use('/users', users);
app.use('/calendars', calendars);
app.use('/events', events);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
