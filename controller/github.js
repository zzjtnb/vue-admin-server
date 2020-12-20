

const { getPrivateKey, getPublicKey } = require('../utils/getKey');
const { createSign, publicEncrypt } = require('../utils/encrypt');
const axios = require('../utils/http_server');
class githubController {
  async getUserInfo(req, res, next) {
    let data = {
      username: req.params.username,
      timestamp: Math.round(new Date().getTime() / 1000),
    }
    let userData = {
      "data": publicEncrypt(JSON.stringify(data), getPublicKey('MSFSFSJASFKIJDGHDUSFOJDOIEIWJROIERJ')),
      "sign": createSign(JSON.stringify(data), getPrivateKey('LMFDGHJHFJIUWEOWEQWPOUEIPOIQPWE')),
    }
    axios.post('https://api.github.com', userData).then(res => {

    }).catch(err => {

    })
  }
}
module.exports = new githubController();
