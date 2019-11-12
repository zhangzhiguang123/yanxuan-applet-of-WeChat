// pages/index/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: {
      background: [],
      autoplay: true,
      interval: 2000,
      duration: 500,
      indicatorDots: true
    },
    channelList:[],
    categoryList:[],
    brandList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
      }
    });
    wx.request({
      url: 'http://118.25.222.68:5757/heyushuo/index/index', //请求数据
      success(res) {
        // console.log(res.data)
        let categoryListStr = JSON.stringify(res.data.newCategoryList);//为了给路由传参
        that.setData({
          swiperData: {
            background: res.data.banner,
            autoplay: true,
            interval: 2000,
            duration: 500,
            indicatorDots: true
          },
          channelList:res.data.channel,
          categoryList:categoryListStr,
          brandList:res.data.brandList
        });
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})