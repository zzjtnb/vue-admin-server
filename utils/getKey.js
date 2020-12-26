/**
 * 1.密钥格式通常有两种，分别是pkcs1和pkcs8，pkcs代表Public Key Cryptography Standards
 * 2. pkcs1格式开头BEGIN RSA PRIVATE KEY  pkcs8格式 开头BEGIN PRIVATE KEY  中间是BASE64 ENCODED DATA
 * 3.phpseclib 生成的密钥对中，公钥使用的是 pkcs8 格式，私钥使用 pkcs1 格式，但文档中对它们的描述都是 pkcs1 格式
<? php

//转换publickey格式
 function getPublicKey()
  // 系统公钥
  $publickey = 'LKDKFJIDOWEIRLKLDSJKJFDLK';
  $key = trim(publickey);
  if (!$key) throw new \Exception('publickkey not found');
  $key = preg_replace('#^-----[^-]+-----|-----[^-]+-----$|\s|\r|\n#', "", $key);
  $chunk = str_split($key, 64);
  $key = "-----BEGIN PUBLIC KEY-----\n".join("\n", $chunk)."\n-----END PUBLIC KEY-----";
  echo ("<script>console.log(" . json_encode($key) . ");</script>");
  return openssl_get_publickey($key);
}

//转换privatekey格式
 function getPrivateKey() {
  // 私钥
  $privatekey = 'WLEKOWQKFJDSSHFIHDFD';
  $key = trim( privatekey);
  if (!$key) throw new \Exception('privatekey not found');
  $key = preg_replace('#^-----[^-]+-----|-----[^-]+-----$|\s|\r|\n#', "", $key);
  $chunk = str_split($key, 64);
  $pad = strlen(end($chunk)) % 4;
  if ($pad > 2) {
    $pad = 4 - $pad;
  }
  $key = "-----BEGIN PRIVATE KEY-----\n".join("\n", $chunk).str_repeat('=', $pad)."\n-----END PRIVATE KEY-----";
  echo ("<script>console.log(" . json_encode($key) . ");</script>");
  return openssl_get_privatekey($key);
}
 */

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
  let arr = []
  for (var i = 0; i < key.length; i += 64) { arr.push(key.substring(i, i + 64)) }
  let endStr = arr.pop()
  let pend = endStr.length % 4
  pend = pend > 2 ? 4 - pend : pend
  arr.push(endStr += '='.repeat(pend))
  return '-----BEGIN PRIVATE KEY-----\n' + arr.join('\n') + '\n-----END PRIVATE KEY-----';
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
