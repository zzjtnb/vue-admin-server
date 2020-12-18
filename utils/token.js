const jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'ggcjdss'//签名
//登录接口 生成token的方法
const setToken = function (data) {
  return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });
}
//各个接口需要验证token的方法
const getToken = function (token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

const verify = async function (token) {
  return await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return false
    return true
  });
}
module.exports = {
  setToken,
  getToken,
  verify
}