/**
 * null => ''
 * @param {*} data 要处理的数据
 */
function null2str(data) {
  for (let x in data) {
    if (data[x] === null) { // 如果是null 把直接内容转为 ''
      data[x] = '';
    } else {
      if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
        data[x] = data[x].map(z => {
          return null2str(z);
        });
      }
      if (typeof (data[x]) === 'object') { // 是json 递归继续处理
        data[x] = null2str(data[x])
      }
    }
  }
  return data;
}

/**
 * '' => null
 * @param {*} data 要处理的数据
 */
function str2null(data) {
  let reg = /^\s+|\s+$/g
  for (let x in data) {
    if (data[x] === '' || reg.test(data[x])) { // 如果是'' 把直接内容转为 null
      data[x] = null;
    } else {
      if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
        data[x] = data[x].map(z => {
          return str2null(z);
        });
      }
      if (typeof (data[x]) === 'object') { // 是json 递归继续处理
        data[x] = str2null(data[x])
      }
    }
  }
  return data;
}
module.exports = {
  null2str, str2null,
};
