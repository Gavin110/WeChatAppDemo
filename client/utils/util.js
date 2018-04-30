const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

//const baseUrl = "http://localhost:54389/api/Values/";
const baseUrl = "https://413320920.liugy.club:8082/api/Values/";
const requestJson = (url, data, success) => {
  wx.request({
    url: baseUrl + url,
    data: data,
    header: {
      "client": "ajax"
    },
    method: 'GET',
    dataType: 'json',   //预期服务器返回的数据类型
    responseType: 'text', //设置响应的数据类型。合法值：text、arraybuffer
    success: function (res) {
      success(res.data);
    },
    fail: function (res) {
      
    },
    complete: function (res) {
    },
  })
}

module.exports = { 
  formatTime, 
  showBusy, 
  showSuccess, 
  showModel,
  requestJson
   }
