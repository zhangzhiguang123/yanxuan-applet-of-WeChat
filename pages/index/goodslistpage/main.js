// pages/index/goodslistpage/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allData:[], //传过来的所有数据
    goodslist:[], //此页应该被渲染的商品列表
    isActive:0,  //被选中的下标
    title:[
      "回家，放松身心",
      "厨房",
      "好吃，高颜值美食",
      "配角，亦是主角",
      "贴身的，要亲肤",
      "爱，从心开始",
      "解忧，每个烦恼",
      "亲肤之物，严选天然",
      "爱好，点缀生活"
    ],
    scrollLeft:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
     let data = JSON.parse(options.data);
     data.forEach((item,index)=>{
        if(options.id===item.id.toString()){  //保证渲染数据为同id的商品列表，遍历数据，查找对应id，并赋值
          that.setData({
            allData: data,
            goodslist: item,
            isActive:index
          });
        }
     });
     if(that.data.isActive>5){   //将选中的选项显示出来
         that.setData({
           scrollLeft: that.data.isActive*60
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
  activeMe(e){   //选项卡点击事件，点击时改变相应数据
    let that = this;
    let activeThis = e.currentTarget; //选中的元素
    // console.log(e.currentTarget);
    this.data.allData.forEach(item=>{
      if(item.id===activeThis.dataset.id){
        that.setData({
          goodslist: item,
          isActive: activeThis.dataset.index
        });
      }
    });
    console.log(that.data.goodslist)
  }
})