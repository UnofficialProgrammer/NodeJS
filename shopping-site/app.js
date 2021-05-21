var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

var hbs = require('express-handlebars')

var app = express();

//require file upload
var fileUpload = require('express-fileupload');

//getting express-session
var session = require('express-session');


//getting the databases
var database_connection = require('./config/connection');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//setting up layout and partials
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/',helpers:{inc: (value, options)=>{return parseInt(value) + 1;}}}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//for fileuploading
app.use(fileUpload());

//use session and setting timeout
app.use(session({secret:"Key359",resave: true,
saveUninitialized: true, cookie:{maxAge:600000}})); //600000->10 minute

//connecting to database
database_connection.connect((err)=>{
  if(err) console.log("Failed To Connect"+err)
  else console.log("Database Connected. PORT 27017")
});

app.use('/', userRouter);
app.use('/admin', adminRouter);

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
