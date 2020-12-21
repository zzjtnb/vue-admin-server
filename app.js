const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const config = require('./config/config');
const { appLog, httpLogger, httpErrorLogger } = require('./middleware/logger');
const router = require('./routes/router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Request logger
app.use(httpLogger)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use('/api', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ code: 404, message: '路径不存在' })
  next();
});

// error handle
app.use((err, req, res, next) => {
  console.log("错误");
  httpErrorLogger.error("Something went wrong:", err.message, err);
  if (req.xhr) {
    return res.json({
      state: false,
      message: err.message
    });
  }
  next(err);
});

module.exports = { app, config, appLog };
