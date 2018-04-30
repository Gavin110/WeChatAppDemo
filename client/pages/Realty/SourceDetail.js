// pages/Realty/SourceDetail.js
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '../../../images/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '../../../images/location.png'
    }]  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.mapCtx = wx.createMapContext('myMap');
    
    util.requestJson('getSourceData', {
      sourceId: options.sourceId
    }, function (res) {
      var tempMovies = [];
      tempMovies.push({ 'url': res[0].VicePic1});
      tempMovies.push({ 'url': res[0].VicePic2 });
      tempMovies.push({ 'url': res[0].VicePic3 });
      tempMovies.push({ 'url': res[0].VicePic4 });
      tempMovies.push({ 'url': res[0].VicePic5 });
      tempMovies.push({ 'url': res[0].VicePic6 });
      _this.setData({movies: tempMovies})
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})