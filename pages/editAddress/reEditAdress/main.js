// pages/editAddress/reEditAdress/main.js
import {
  requestData, sendData
} from "../../../api/rq.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addrInfo: {},
    name: String,
    mobile: Number,
    address: String,
    address_detail: String,
    isDefault: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id;
    if(options.id===0){
      id = "0";
    }else{
      id = options.id || "";
    }
    if(id!==""){
      requestData(`heyushuo/address/detailAction?id=${id}`).then(res => { //拿当前ID的个人信息，并赋给数据模型
        console.log(res.data.data);
        that.setData({
          addrInfo: res.data.data,
          name: res.data.data.name,
          mobile: res.data.data.mobile,
          address: res.data.data.address,
          address_detail: res.data.data.address_detail,
        });
      })
    }else{
      that.setData({
        addrInfo:{},
        name: "",
        mobile: Number,
        address: String,
        address_detail: String,
      });
    }
   
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

  },
  /**
   * 用户点击右上角分享
   */
  goSaveAddress() {
    let that = this;
   let addrId= that.data.addrInfo.id||"";
    let sendDataObj = {
      address: that.data.address,
      addressId: addrId,
      checked: that.data.isDefault,
      detailadress: that.data.address_detail,
      openId: "oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
      telNumber: that.data.mobile,
      userName: that.data.name
    };
    // console.log(sendDataObj);

    sendData("heyushuo/address/saveAction",sendDataObj).then(res=>{
      console.log(res.data.data);
      if(res.data.data){
        let pages = getCurrentPages();
        let beforePage = pages[pages.length - 2];
        beforePage.loadData();  //刷新上页数据
        wx.navigateBack({
          delta:1
        })
      }
    }).catch(err=>{
      throw err;
    });

  },

  getName(e) {
    this.setData({
      name: e.detail.value
    });
  },

  getMobile(e) {
    this.setData({
      mobile: e.detail.value
    });
  },

  getAddress(e) {
    this.setData({
      address: e.detail.value
    });
  },

  getAddress_detail(e) {
    this.setData({
      address_detail: e.detail.value
    });
  },

  getIsDefault(e) {
    let that = this;
    this.setData({
      isDefault: !that.data.isDefault
    });
  }
})