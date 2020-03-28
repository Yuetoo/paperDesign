var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');



var userRouter = require('./routes/userAdmin');
var questionRouter = require('./routes/questionAdmin');
var paperRouter = require('./routes/paperAdmin');
var bulletinRouter = require('./routes/bulletinAdmin');

var url = 'http://localhost:8080';

const config = require('config-lite')({
  filename: 'default',
  config_basedir: __dirname,
  config_dir: 'config'
});

var app = express();

//跨域问题解决方面
const cors = require('cors');  
app.use(cors({  
    origin:[url],
    methods:['GET','POST'],
}));
//跨域问题解决方面
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', url);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
　next();　
});

 
console.log("mysql服务器：" + config.mysql.user);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.get('/public/*', function (req, res) {
  res.sendfile(__dirname + "/" + req.url)
});

//路由模块
app.use('/user',userRouter);
app.use('/question',questionRouter);
app.use('/paper',paperRouter);
app.use('/bulletin',bulletinRouter);

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



app.listen(3000, function () {
  console.log('app is running at port 3000.')
})

module.exports = app;
