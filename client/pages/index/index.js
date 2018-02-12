//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
      windowWidth: wx.getSystemInfoSync().windowWidth,
      start_clientX: 0,
      end_clientX: 0,
      animationData: {}
    },
    // 滑动开始  
    touchstart: function (e) {
      this.data.start_clientX = e.changedTouches[0].clientX;
    },
    // 滑动结束  
    touchend: function (e) {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'linear',
      })
      
      this.data.end_clientX = e.changedTouches[0].clientX;
      if (this.data.end_clientX - this.data.start_clientX > 80) {
        // this.setData({
        //   mainTranslate: 'transform: translateX(' + this.data.windowWidth * 0.7 + 'px);'
        // })
        animation.translateX(this.data.windowWidth * 0.7).step();
        this.setData({
          animationData: animation.export()
        })
      }
      else if (this.data.start_clientX - this.data.end_clientX > 80) {
        // this.setData({
        //   mainTranslate: ''
        // });
        animation.translateX(0).step();
        this.setData({
          animationData: animation.export()
        })
      }
    },
})
