//添加请求根目录
function goPost(url, data, cb) {
  wx.request({
    url: url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}
function getDataKey() {
  return ""
}
function goGet(url, data, cb) {
  wx.request({
    url: url,
    data: data,
    method: 'get',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
      },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

module.exports = {
  goPost: goPost,
  getDataKey: getDataKey,
  goGet: goGet,
}