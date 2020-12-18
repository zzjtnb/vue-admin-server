const dbConfig = {
  test: {
    "dialect": "mysql",
    'host': 'localhost',
    'port': 3306,
    'username': 'root',
    'password': 'root',
    'database': 'vuerole',
    'timezone': '+08:00',
    define: {
      freezeTableName: false,//使用数据库里的真实表面
      underscored: false,// 字段以下划线_来分割(默认是驼峰命名风格)
      timestamps: false, // create_time && update_time
      'pool': {
        max: 5,
        min: 0,
        idle: 1000,
        acquire: 3000
      },
    },
  }
};
module.exports = dbConfig