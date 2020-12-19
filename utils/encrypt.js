/**
 * 对应PHP的签名加密
 * 1.将接口的参数转成jsonstr
 * 2.以系统公钥对jsonstr进行加密
 * 3.以客户端私钥对jsonstr进行签名
<? php
include('config.php');// include clientprivatekey, systempublickey, apikey
//签名
openssl_sign($jsonstr, $signature, $clientprivatekey);
$postdata['sign'] = base64_encode($signature);
//加密
$chunk = str_split($jsonstr, 117);
$output = '';
foreach($chunk as $str){
if (!openssl_public_encrypt($str, $crypted, $systempublickey))
throw new Exception('encrypt err');
$output.= $crypted;
}
$postdata['data'] = base64_encode($output);
echo "请求的资料: ".http_build_query($postdata);
*/

const crypto = require('crypto');
/**
 * 创建签名（使用私钥和数据）
 * @param data
 * @param privateKey
 * @returns {string}
 */
function createSign(data, privateKey) {
  // 'RSA-SHA1'--签名算法的名称
  const signer = crypto.createSign('RSA-SHA1');
  signer.update(data);
  signer.end();
  return signer.sign(privateKey, 'base64')
}
/**
 * 加密数据（使用公钥和数据）
 * @param {string} data
 * @param {string} publicKey
 * @returns {string}
 */
function publicEncrypt(data, publicKey) {
  var bufferToEncrypt = Buffer.from(data);
  var encrypted = crypto.publicEncrypt({ "key": publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufferToEncrypt).toString("base64")
  return encrypted
}
module.exports = {
  createSign, publicEncrypt
};
