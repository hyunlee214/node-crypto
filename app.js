"use strict";

const createError    = require('http-errors');
const express        = require('express');
const path           = require('path');
const cookieParser   = require('cookie-parser');
const logger         = require('morgan');
const models         = require('./models/index.js');
const session        = require('express-session');
const methodOverride = require('method-override');

// upload를 위한 라우터 등록
const indexRouter         = require('./routes/index');
const usersRouter         = require('./routes/users');
const uploadRouter        = require('./routes/upload');
//upload 추가
const indexRouter2        = require('/routes/index');
const usersRouter2        = require('/routes/users');
const fileUploadRouter    = require('/routes/uploadBoard');

const app = express();

models.sequelize.sync().then(() => {
  console.log('db연결성공');
}). catch(err => {
  console.log('db연결실패');
  console.log(err);
})

// view engine setup
app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(methodOverride('_method'))
  .use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie : {
    maxAge: 24000 * 60 * 60 
  }
}))
  .use(express.static(path.join(__dirname, 'public')))
  
  .use('/', indexRouter)
  .use('/user', usersRouter)
  // new multer
  .use('/', indexRouter2)
  .use('/user', usersRouter2)

// multer등록
  .use('/upload', uploadRouter)
  .use('/upload', express.static('uploads'))

  .use('/uploadBoard', fileUploadRouter)
  .use('/uploadBoard', express.static('uploads'))
// static 파일이 접근할 라우터 path설정 
// (express.static 함수를 통해 제공되는 파일에 대한 가상 경로)

// catch 404 and forward to error handler
  .use(function(req, res, next) {
  next(createError(404))
})

// error handler
  .use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
