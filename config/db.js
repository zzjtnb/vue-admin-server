const { sql } = require('../middleware/logger')

const db = {
  dev: {
    dialect: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'vuerole',
    timezone: '+08:00',
    define: {
      timestamps: true, // create_time && update_time
      pool: {
        max: 5,
        min: 0,
        idle: 1000,
        acquire: 3000
      },
    },
    //如果选择log.logger.info,会有Cannot read property 'isLevelEnabled' of null的异常。
    logging: sql,
  }
};
module.exports = db