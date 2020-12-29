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
  const MAX_ENCRYPT_BLOCK = 117;
  //得到公钥
  // var publicPem = fs.readFileSync(path.join(__dirname, "../../properties/rsa_public_key.pem"));//替换你自己的路径
  // var publicKey = publicPem.toString();
  var bufferToEncrypt = Buffer.from(data, 'utf8'); //加密信息用bufferToEncrypt封装
  var inputLen = bufferToEncrypt.byteLength;
  var bufs = []; //密文
  var offSet = 0;  //开始长度
  var endOffSet = MAX_ENCRYPT_BLOCK;  //结束长度
  //分段加密
  while (inputLen - offSet > 0) {
    if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
      var bufTmp = bufferToEncrypt.slice(offSet, endOffSet);
      bufs.push(crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    } else {
      var bufTmp = bufferToEncrypt.slice(offSet, inputLen);
      bufs.push(crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    }
    offSet += MAX_ENCRYPT_BLOCK;
    endOffSet += MAX_ENCRYPT_BLOCK;
  }
  const result = Buffer.concat(bufs);
  const base64Str = result.toString("base64");  //密文BASE64编码
  return base64Str;
}

// 下面这种报错 Error: error:0406D06E:rsa routines:RSA_padding_add_PKCS1_type_2:data too large for key size
// function publicEncrypt(data, publicKey) {
//   var bufferToEncrypt = Buffer.from(data);
//   var encrypted = crypto.publicEncrypt({ "key": publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufferToEncrypt).toString("base64")
//   return encrypted
// }
module.exports = {
  createSign, publicEncrypt
};
