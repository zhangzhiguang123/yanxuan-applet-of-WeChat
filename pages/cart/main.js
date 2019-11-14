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
    selectNumber: 0,
    allMoney: 0,
    isShowOrder:false,
    movePosi:0,   //触发滚动位置横坐标，用于删除按钮处
    hasShow:Number  //决定删除是否出现，数字为下标
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
      if(that.data.cartdata.length!==0) { //根据购物车是否为空设置下单固定栏是否显示
        that.setData({
          isShowOrder:true
        });
      }
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
    let isAlls = false;  //如果全被选中,就将全选按钮置为选中，这个变量保存是否被全选的flag;
    let selnum = 0;  //选中的商品数量
    let allmoney = 0; //总钱数
    mArr.forEach((item,index)=>{
      if(item){
        isAlls = true;  //如果存在没被选中的将isAlls置为true
      }else{
       selnum++;//选中数量增加
       allmoney+=that.data.cartdata[index].number*that.data.cartdata[index].retail_price;  //总钱数增加
      }
    });

    that.setData({  //设置全选按钮
      isAllSelected:isAlls,
      selectNumber:selnum,
      allMoney:allmoney
    });

  },
  goSelectAll(e) { //全选按钮事件处理
    let that = this;
    let mArr = that.data.isSelected;
    let flag = 1;  //立个flag，如果商品选中按钮中存在没有被选中的，将flag设为0，这是为了让全选按钮实现全选中
    let selNum = 0; //选中的商品数量
    let allmoney = 0; //总钱数
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
    mArr.forEach((item,index)=>{
      if(!item){
        selNum++;
        allmoney += that.data.cartdata[index].number * that.data.cartdata[index].retail_price;
      }
    });
    that.setData({
      isSelected: mArr,  //重置商品按钮选中数组
      isAllSelected: !that.data.isAllSelected,  //将全选按钮反选
      selectNumber:selNum,
      allMoney:allmoney
    });
  },

  moveStart(e){   //触摸删除事件
    // console.log(e.changedTouches[0].clientX);
    let that = this;
    that.setData({
      movePosi:e.changedTouches[0].clientX
    });
  },

  moving(e){    //触摸滑动事件
    let that = this;
    if (e.changedTouches[0].clientX-that.data.movePosi<=-20){
      that.setData({
        hasShow:e.currentTarget.dataset.index
      });
    };
    if (e.changedTouches[0].clientX - that.data.movePosi >= 20) {
      if (e.currentTarget.dataset.index!==that.data.hasShow){  //防止反向滑动此商品，导致其他商品的删除按钮消失
        return;
      }else{
        that.setData({
          hasShow: Number
        });
      }
      
    }; 
  },

  deletThisGoods(e){   //删除处理
    let that = this;
    let id = e.currentTarget.dataset.id;
    let url = "heyushuo/cart/deleteAction?id="+that.data.cartdata[id].id;
    requestData(url).then(res=>{
      // console.log(res);
      if (res.statusCode === 200 && res.errMsg ==="request:ok"){
        let mArr = that.data.cartdata; //更新视图
        mArr.splice(id,1);
        
        wx.showToast({
          title: '删除成功',
        });

        that.setData({
          cartdata: mArr
        });
      }
    }).catch(err=>{
      console.log(err);
    });
  }

})