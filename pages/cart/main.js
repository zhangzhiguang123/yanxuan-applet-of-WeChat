// pages/cart/main.js
import {
  requestData
} from "../../api/rq.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartdata: [],
    isSelected: [], //这个数组记录所有选中按钮的状态，元素为布尔类型，与购物车商品数据数组一一对应，true为没被选中
    isAllSelected: true, //这个代表全选按钮状态，true代表没被选中
    selectedNumber: 0,
    allMoney: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    requestData("heyushuo/cart/cartList?openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c").then(res => {
      that.setData({
        cartdata: res.data.data
      }); //拿购物车数据
      console.log(that.data.cartdata);
      that.data.cartdata.forEach((item, index) => { //开始时初始化isSelected数组，将所有的选中按钮置为不选中
        let mArr = that.data.isSelected;
        mArr.push(true);
        that.setData({
          isSelected: mArr
        });
      });
    }).catch(err => {
      console.log(err);
    });
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
  goSelected(e) { //单个商品选中处理
    let that = this;
    let index = e.currentTarget.dataset.index;
    // console.log(index);
    that.setData({ //重新赋值,将相应选中按钮的wx:if的数据模型取反
      ['isSelected[' + index + ']']: !that.data.isSelected[index] //属性赋值
    });

    let mArr = that.data.isSelected;
    let isAlls = false;  //如果全被选中,就将全选按钮置为选中，这个变量保存是否被全选的flag
    mArr.forEach(item=>{
      if(item){
        isAlls = true;  //如果存在没被选中的将isAlls置位true
      }
    });

    that.setData({  //设置全选按钮
      isAllSelected:isAlls
    });

  },
  goSelectAll(e) { //全选按钮事件处理
    let that = this;
    let mArr = that.data.isSelected;
    let flag = 1;  //立个flag，如果商品选中按钮中存在没有被选中的，将flag设为0，这是为了让全选按钮实现全选中
    mArr = mArr.map(item => {
      if (item) {
        flag = 0;
        return !item;
      }
      return item;
    });

    if (flag) {  //如果商品选中按钮全被选中了，统一取反，实现反选功能
      mArr = mArr.map(item=>!item);
    }

    that.setData({
      isSelected: mArr,  //重置商品按钮选中数组
      isAllSelected: !that.data.isAllSelected  //将全选按钮反选
    });
  }
})