const { sequelize } = require('.//index');

sequelize.sync({ alter: true }).then((res, err) => {
    console.log("所有模型均已成功同步.");
    process.exit();
});



