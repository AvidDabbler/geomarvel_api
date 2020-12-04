var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var getAllRouter = require('./routes/getAll');
var getByParamsRouter = require('./routes/getByParams');

var app = express();

// const cors = require('cors');

// let whitelist = ['http://192.168.1.107:3001']

// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     if(!origin) return callback(null, true);
//     if(whitelist.indexOf(origin) === -1){
//       var message = 'error';
//       return callback(new Error(message), false);
//     }
//     return callback(null, true);
//   }
// }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/getAll', getAllRouter);
app.use('/getByParams', getByParamsRouter);

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

module.exports = app;
