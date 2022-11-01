import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Vue.filter("myFilter",function(value){
//   console.log(this)
//   return value+"********"
// })

/*
  需求:当项目中的组件挂载结束之后,需要打印当前组件的name名称
  通过全局混合/混入,实现对所有组件对象进行注入操作


  功能:当用户的鼠标在页面上移动的时候,自动在页面上显示当前鼠标坐标
  拆解:
    1.当用户的鼠标在页面上移动的时候
      事件源:document
      事件名:mousemove

    2.自动在页面上显示当前鼠标坐标
      继续拆解:
        1.将数据显示在页面上
          可以通过data配合template中的插值语法实现

        2.如何知道鼠标的坐标?
          在事件回调函数的event中,就可以获取到当前鼠标的坐标信息

    全局混合->Vue.mixin
    局部混合->配置对象中的mixins数组

    注意:全局混合,局部混合,还有组件自己的钩子函数是可以共存的
    如果属性冲突了,三者的优先级顺序:组件>局部混合>全局混合
*/

Vue.mixin({
  methods:{
    a(){
      console.log('我是全局的a')
    }
  },
  mounted(){
    console.log('全局的mixin')
  }
})


new Vue({
  name:"Root",
  render: h => h(App),
}).$mount('#app')
