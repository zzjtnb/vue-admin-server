const axios = require('axios');
const qs = require('qs');
// 创建axios实例s
const service = axios.create({
  // baseURL: "https://api.github.com",
  timeout: 200 * 1000, // 请求超时时间
  /**
   *  `transformRequest` 允许在向服务器发送前，修改请求数据
   * 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
   */
  transformRequest(data, headers) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return qs.stringify(data);
  }
})
// request拦截器,拦截每一个请求加上请求头
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})
// respone拦截器 拦截到所有的response，然后先做一些判断
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  }, error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  })

module.exports = service