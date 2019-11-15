// pages/editAddress/main.js
import {
  requestData
} from "../../api/rq.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addrlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    requestData("heyushuo/address/getListAction?openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c").then(res => { //请求后台地址列表
      that.setData({
        addrlist: res.data.data
      });
      console.log(that.data.addrlist);
    }).catch(err => {
      console.log(err);
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

  },
  /**
   * 点击选择地址事件处理
   */
  selectAddress(e) {
    let that = this;
    let data = that.data.addrlist[e.currentTarget.dataset.index];
    let pages = getCurrentPages();  // 当前页的数据
    let prevPage = pages[pages.length - 2];  // 上一页的数据，也可以输出来看看有什么东西
    prevPage.setData({
      address: data
    })

    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 重新相应编辑地址事件处理
   */
  reEditThisAddress(e) {
   wx.navigateTo({
     url: `reEditAdress/main?id=${e.currentTarget.dataset.index}`,
   })
  },

/**
   * 添加新地址事件处理
   */
  addAddress(){
   wx.navigateTo({
     url: 'reEditAdress/main'
   })
  }
})