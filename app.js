var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
//var index = require('./routes/index');
var app = express();

//import * as admin from "firebase-admin";

var admin = require('firebase-admin');

var serviceAccount = require("./project-test-4585e73d8343.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
/*app.use('/',
  router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
  })
);*/

app.use(require('./routes/admin/delete/user.js'));
app.use(require('./routes/admin/delete/comment.js'));
app.use(require('./routes/admin/delete/topic_and_comments.js'));
app.use(require('./routes/admin/userlist.js'));
app.use(require('./routes/user/create_user.js'));
app.use(require('./routes/topic/create.js'));
app.use(require('./routes/board/view.js'));
app.use(require('./routes/board/make_comment.js'));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

 // All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
