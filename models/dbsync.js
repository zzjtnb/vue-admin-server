const { sequelize } = require('.//index');
// const options = { force: true }
const options = { alter: true }
sequelize.sync(options).then((res, err) => {
    console.log("所有模型均已成功同步.");
    process.exit();
});



