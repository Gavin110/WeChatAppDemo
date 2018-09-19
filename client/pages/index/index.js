//index.js
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    start_clientX: 0,
    end_clientX: 0,
    //动画属性
    animationData: {},
    animationDataToUp: {},

    progressWeiboNum: 0,
    progressWeixinNum: 0,
    progressWeiRedbookNum: 0,
    count_weixin: 0,
    count_weibo: 0,
    count_redbook: 0,
    stopCount: 100,
    countWeiboTimer: null,
    countWeixinTimer: null,
    countWeiRedbookTimer: null,
  },
  onReady: function() {
    console.log("hahah"); 
    // scroll_up
    var query = wx.createSelectorQuery()
    query.select('#scroll_up').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      //res[0].top       // #the-id节点的上边界坐标
      //res[1].scrollTop // 显示区域的竖直滚动位置
      console.log("res:::::",res);
    })
  },
  // 滑动开始  
  touchstart: function (e) {
    this.data.start_clientX = e.changedTouches[0].clientX;
  },
  // 滑动结束  
  touchend: function (e) {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.data.end_clientX = e.changedTouches[0].clientX;
    if (this.data.end_clientX - this.data.start_clientX > 80) {
      // this.setData({
      //   mainTranslate: 'transform: translateX(' + this.data.windowWidth * 0.7 + 'px);'
      // })
      animation.translateX(this.data.windowWidth * 0.7).step();
      this.setData({
        animationData: animation.export()
      })
    } else if (this.data.start_clientX - this.data.end_clientX > 80) {
      // this.setData({
      //   mainTranslate: ''
      // });
      animation.translateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }
  },
  toUpAnimation: function() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    // animation.translateY(-200).step();
    animation.bottom(0).step();
    this.setData({
      animationDataToUp: animation.export()
    })

  },
  onLoad: function() {
    //this.countInterval(65.56); //累计支出画圈百分比
  },
  onReady: function() {
    var _this = this;
    // 页面渲染完成  
    _this.drawProgressbg();
    _this.countWeiboInterval(88.27);
    // _this.countWeixinInterval(54.26);
    // _this.countRedbookInterval(45.69);
  },
  //渲染成图片
  handleCanvarToImg(that) {
    wx.canvasToTempFilePath({
      x: 45,
      y: 45,
      width: 90,
      height: 90,
      canvasId: 'canvasProgressbg_weibo',
      success: function (res) {
        that.setData({
          weiboImg: res.tempFilePath
        });
        console.log("保存成功");
      },
      fail: function (e) {
        console.log("eeeeeeeeeeeeeee::", e);
      }
    });
  },
  // 1.在js中封装一个画圆环的函数drawProgressbg，canvas画圆,在onReady中执行这个函数；  
  drawProgressbg: function() {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctxList = [];
    ctxList.push(wx.createCanvasContext('canvasProgressbg_weibo'));
    ctxList.push(wx.createCanvasContext('canvasProgressbg_weixin'));
    ctxList.push(wx.createCanvasContext('canvasProgressbg_redbook'));
    ctxList.forEach(function(item){
      item.setLineWidth(6); // 设置圆环的宽度
      item.setStrokeStyle('#E6ECF8'); // 设置圆环的颜色
      item.setLineCap('round') // 设置圆环端点的形状
      item.beginPath(); //开始一个新的路径
      item.arc(45, 45, 40, 0, 2 * Math.PI, false);
      //设置一个原点(100,100)，半径为90的圆的路径到当前路径
      item.stroke(); //对当前路径进行描边
      item.draw();
    });
  },
  // 2.在js中封装一个画圆环的函数drawCircle，在onReady中执行这个函数；
  drawCircle: function(step,circleName) {
    var context = wx.createCanvasContext('canvasProgress'+circleName);
    var color;
    if(circleName == "_weibo") {
      color = "#1ec46f";
    } else if(circleName == "_weixin") {
      color = "#4589fe";
    } else if(circleName == "_redbook") {
      color = "#7a83a4";
    }
    context.setLineWidth(6);
    context.setStrokeStyle(color);
    context.setLineCap('round');
    context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(45, 45, 40, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    context.stroke();
    context.draw()
    this.handleCanvarToImg(this);
  },
  countWeiboInterval: function(percentNum) {
    this.setData({
      progressWeiboNum: percentNum.toFixed(0)
    });
    this.countWeiboTimer = setInterval(() => {
      if (this.data.count_weibo <= this.data.stopCount) {
        this.drawCircle(this.data.count_weibo / 5000 * percentNum,'_weibo');
        this.data.count_weibo++;
      } else {
        clearInterval(this.countWeiboTimer);
      };
    }, 10);
  },
  countWeixinInterval: function (percentNum) {
    this.setData({
      progressWeixinNum: percentNum.toFixed(0)
    });
    this.countWeixinTimer = setInterval(() => {
      if (this.data.count_weixin <= this.data.stopCount) {
        this.drawCircle(this.data.count_weixin / 5000 * percentNum,'_weixin');
        this.data.count_weixin++;
      } else {
        clearInterval(this.countWeixinTimer);
      };
    }, 10);
  },
  countRedbookInterval: function (percentNum) {
    this.setData({
      progressRedbookNum: percentNum.toFixed(0)
    });
    this.countRedbookTimer = setInterval(() => {
      if (this.data.count_redbook <= this.data.stopCount) {
        this.drawCircle(this.data.count_redbook / 5000 * percentNum,'_redbook');
        this.data.count_redbook++;
      } else {
        clearInterval(this.countRedbookTimer);
      };
    }, 10);
  },
})