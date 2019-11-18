// pages/index/goodslistpage/main.js
import {
  requestData
} from "../../../api/rq.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: Object, //默认选中的nav
    navList: Array,
    goodslist: [], //此页商品列表
    isActive: 0, //被选中的下标
    scrollLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let URLid = options.id;
    let activeIndex; //保存应该选中的下标
    requestData(`heyushuo/category/categoryNav?id=${URLid}`).then(res => { //请求nav信息
      console.log(res.data);
      res.data.navData.forEach((item, index) => {
        // console.log(item.id,URLid);
        if (item.id.toString() === URLid) {
          activeIndex = index;
        }
      });
      that.setData({
        currentData: res.data.currentNav,
        navList: res.data.navData,
        isActive: activeIndex,
      });
      if (that.data.isActive > 5) { //将选中的选项显示出来
        that.setData({
          scrollLeft: that.data.isActive * 60
        });
      }
    }).catch(err => {
      console.log(err);
    })

    requestData(`heyushuo/goods/goodsList?categoryId=${URLid}`).then(res => { //请求此页应该渲染的商品列表
      console.log("我想看的", res);
      that.setData({
        goodslist: res.data.data
      });
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
  activeMe(e) { //选项卡点击事件，点击时改变相应数据
    let that = this;
    let activeThis = e.currentTarget; //选中的元素
    // console.log(e.currentTarget);
    this.data.navList.forEach(item => {
      if (item.id === activeThis.dataset.id) {
        requestData(`heyushuo/goods/goodsList?categoryId=${item.id}`).then(res => { //点击更换此页应该渲染的商品列表
          // console.log("我想看的", res);
          that.setData({
            currentData: res.data.currentNav,
            goodslist: res.data.data,
            isActive: activeThis.dataset.index
          });
        }).catch(err => {
          console.log(err);
        })
      }
    });
  }
})