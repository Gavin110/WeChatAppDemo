// pages/realty/SourceList.js
// pages/account/myproject.js
const util = require('../../utils/util.js');
//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    projects: [{
      // "Id": '123454',
      // "ImgSrc": "http://lc-zkmoosmi.cn-n1.lcfile.com/93fb2a63ca50a8e92c4c.jpg",
      // "ProjectName": "围猎",
      // "MainActors": "哥哥",
      // "Director": "吴宇森",
      // "FilmCategories": "战争片",
      // "ShootingGround": "南京"
    }],
    copyProjects: []
  },

  searchCrew: function (event) {
    var _this = this;
    if (event.detail.value.length > 0 && event.detail.value.trim().length > 0) {
      var tempProjects = _this.data.copyProjects.filter(function (item) {
        return (item.ProjectName.indexOf(event.detail.value.trim()) >= 0);
      });
      _this.setData({ projects: tempProjects });
    } else {
      //这边应该在data中新建一个tempProjects的值用来存放首页加载时候从服务器获取的项目数据，这时候就会把该值赋给projects，因为此时不能再用projects赋值给其本身，已经可能被改变了；
      _this.setData({ projects: _this.data.copyProjects });
    }
  },
  intoSourceDetail: function(event) {
    wx.navigateTo({
      url: 'SourceDetail?sourceId=' + event.currentTarget.dataset.sourceid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;
    util.requestJson('getSourceData', {
      
    }, function (res) {
      // console.log('获取到的房源数据：',res);
      $this.setData({ projects: res });
      $this.setData({ copyProjects: res });
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