// components/index/Goodsfloortwo/Goodsfloortwo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     goodsdata:{
        type:Array,
        value:[],
        observer(){   //调试监听改变
         console.log(this.data.goodsdata);
       }
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
     
  },

  /**
   * 组件的方法列表
   */
  methods: {
     
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      
      
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
