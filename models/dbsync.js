const { sequelize } = require('.//index');
// const options = { force: true } //清空表
const options = { alter: true }//不会情况表
sequelize.sync(options).then((res, err) => {
    console.log("所有模型均已成功同步.");
    process.exit();
});



