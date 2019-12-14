const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const Mongoose = require('mongoose');
const path = require('path');
const socketIo = require('socket.io');

let indexRouter = require('./routes/index'); // admin
let usersRouter = require('./routes/users'); // trader(user)

let app = express();

// setting up SOCKET
let io = socketIo();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

try {
  Mongoose.connect('mongodb://localhost:27017/traders', {
    useCreateIndex: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  });
  Mongoose.connection.on('open', (ref) => {
    console.log('Connected to mongo server.');
    // //trying to get collection names..
    // Mongoose.connection.db.listCollections().toArray((err, collection) => {
    //   console.log(collection); // [{ name: 'dbname.myCollection' }]
    // });
  });
} catch (e) {
  console.log(e);
}

module.exports = app;
