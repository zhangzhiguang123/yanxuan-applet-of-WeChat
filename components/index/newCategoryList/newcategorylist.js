// components/index/newCategoryList/newcategorylist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsdata: {
      type: Object,
      value: null,
      observer() { //调试监听改变
        let that = this;
        if (that.data.goodsdata) {
          that.setData({
            id: that.data.goodsdata.id,
            name: that.data.goodsdata.name,
            goodsList: that.data.goodsdata.goodsList
          });
        }

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id: Number,
    name: String,
    goodsList: Array
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})