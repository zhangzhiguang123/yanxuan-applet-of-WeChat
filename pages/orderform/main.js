import { requestData} from "../../api/rq.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
     cartDataList:[],
     backstageData:Object,
     address:Object
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const eventChannel = that.getOpenerEventChannel();
    eventChannel.on("getCartDatalist",data=>{  //保存购物车商品列表
      that.setData({
        cartDataList: data
      });
    });


    requestData("heyushuo/order/detailAction?openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c&addressId=").then(res => {//请求后台数据 
        if(res.statusCode===200&&res.errMsg==="request:ok"){
          console.log(res.data);
          that.setData({
            backstageData:res.data,
            address: res.data.address
          });
        }else{
          wx.showToast({
            title: '错误!!!',
            icon:"none"
          })
        }
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
    console.log(this.data.address);
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

  goPay(){   //点击支付处理，暂未开通
     wx.showToast({
       title: '暂未开通支付功能',
       icon:"none"
     })
  },

  editAddress(){  //跳转编辑地址页
     let that = this;
     wx.navigateTo({
       url: '../editAddress/main'
     })
  }
})