// pages/Realty/SourceDetail.js
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Price: 0.00,
    RoomType: "",
    Area: 0,
    Orientation: "",
    RepairCost: "",
    Roi: 0.00,
    Floor: "",
    ManageFee: 0.00,
    Rent: 0.00,
    BuildDate: "",
    Status: "",
    LandRight: "",
    Address: "",
    Traffic: "",
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
      var sourceDetailObj = res[0];
      _this.setData({ Price: sourceDetailObj.Price });
      _this.setData({ RoomType: sourceDetailObj.RoomType });
      _this.setData({ Area: sourceDetailObj.Area });
      _this.setData({ Orientation: sourceDetailObj.Orientation });
      _this.setData({ RepairCost: sourceDetailObj.RepairCost });
      _this.setData({ Roi: sourceDetailObj.Roi });
      _this.setData({ Floor: sourceDetailObj.Floor });
      _this.setData({ ManageFee: sourceDetailObj.ManageFee });
      _this.setData({ Rent: sourceDetailObj.Rent });
      _this.setData({ BuildDate: sourceDetailObj.BuildDate.substring(0,10) });
      _this.setData({ Status: sourceDetailObj.Status });
      _this.setData({ LandRight: sourceDetailObj.LandRight });
      _this.setData({ Address: sourceDetailObj.Address });
      _this.setData({ Traffic: sourceDetailObj.Traffic });

      var tempMovies = [];
      tempMovies.push({ 'url': sourceDetailObj.VicePic1});
      tempMovies.push({ 'url': sourceDetailObj.VicePic2 });
      tempMovies.push({ 'url': sourceDetailObj.VicePic3 });
      tempMovies.push({ 'url': sourceDetailObj.VicePic4 });
      tempMovies.push({ 'url': sourceDetailObj.VicePic5 });
      tempMovies.push({ 'url': sourceDetailObj.VicePic6 });
      _this.setData({movies: tempMovies});
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