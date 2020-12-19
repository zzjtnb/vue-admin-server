//密钥格式通常有两种，分别是pkcs1和pkcs8，pkcs代表Public Key Cryptography Standards
// pkcs1格式开头BEGIN RSA PRIVATE KEY  pkcs8格式 开头BEGIN PRIVATE KEY  中间是BASE64 ENCODED DATA


function insertStr(str, insertStr, sn) {
  var newstr = '';
  for (var i = 0; i < str.length; i += sn) {
    var tmp = str.substring(i, i + sn);
    newstr += tmp + insertStr;
  }
  return newstr;
}
/**
 *生成格式化RSA PKCS#8格式的私钥
 * @param {string} key  私钥字符串
 * @return {string}  返回PKCS8格式的RSA私钥
 */
const getPrivateKey = function (key) {
  const result = insertStr(key, '\n', 64);
  return '-----BEGIN PRIVATE KEY-----\n' + result + '-----END PRIVATE KEY-----';
};
/**
 *生成格式化RSA PKCS#8格式的公钥
 * @param {string} key 公钥字符串
 * @return {string}  返回PKCS8格式的RSA公钥
 */
const getPublicKey = function (key) {
  const result = insertStr(key, '\n', 64);
  return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
};
module.exports = {
  getPrivateKey, getPublicKey
};
