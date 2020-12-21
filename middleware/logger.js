const log4js = require("log4js");
const config = {
  appenders: {
    //设置控制台输出 （默认日志级别是关闭的（即不会输出日志））
    display: { type: 'console' },
    sqlFile: { type: "dateFile", filename: "logs/db/sql.log", pattern: "yyyy-MM-dd" },
    appFile: { type: "dateFile", filename: "logs/app/info.log", pattern: "yyyy-MM-dd" },
    accessError: { type: "dateFile", filename: "logs/http/error.log", pattern: "yyyy-MM-dd" },
    access: { type: "dateFile", category: "http", filename: "logs/http/access.log", pattern: "yyyy-MM-dd" },
  },
  categories: {
    default: { appenders: ['display'], level: 'DEBUG' },
    db_sql: { "appenders": ["sqlFile"], "level": "INFO" },
    http: { "appenders": ["access"], "level": "INFO" },
    httpError: { "appenders": ["accessError"], "level": "ERROR" },
    app: { "appenders": ["appFile", "display"], "level": "INFO" },
  },
  "pm2": true
};

log4js.configure(config);
const logger = log4js.getLogger();
const httpLogger = log4js.connectLogger(log4js.getLogger("http"), { level: 'INFO' })//记录所有访问级别的日志
const httpErrorLogger = log4js.getLogger("httpError")
const appLog = log4js.getLogger("app.js");
const db_sql = log4js.getLogger('db_sql');
//重新写了info方法
function sql(message) {
  db_sql.info(message)
}
module.exports = { logger, httpLogger, httpErrorLogger, appLog, sql };