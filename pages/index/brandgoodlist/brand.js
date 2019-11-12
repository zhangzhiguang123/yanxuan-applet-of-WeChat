// pages/index/brandgoodlist/brand.js
import {requestData} from "../../../api/rq.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
     title:String,
     introduce:String,
     goodsList:Array,
     allURL:[
       "heyushuo/brand/detailaction?id=1026000",
       "heyushuo/brand/detailaction?id=1001000",
       "heyushuo/brand/detailaction?id=1024000",
       "heyushuo/brand/detailaction?id=1001038"
     ],
     thisURL:String,
     isNull:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     const that = this;
     this.setData({
       title:options.name,
       introduce:options.introduce,
       thisURL:that.data.allURL[options.id]
     });
    requestData(that.data.thisURL).then(res=>{
      console.log(res);
      that.setData({
        goodsList:res.data.goodsList,
        isNull: res.data.goodsList.length===0?"0":""  //没有数据时显示数据为空
      });
    }).catch(err=>{
      console.log(err);
    });
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