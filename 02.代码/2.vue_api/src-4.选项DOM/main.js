import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  面试题:请问Vue项目中,能够控制页面显示内容的地方有几个?
  解答:
    1.配置对象中的el属性
      Vue会自动获取el元素内部的结构作为模版使用

    2.配置对象中的template字符串
      Vue会将template字符串编译成render函数,并调用生成结构展示

    3.配置对象中render函数
      调用render函数会自动返回一段页面结构

  优先级:render>template>el

*/

// new Vue({
//   el:"#app",
//   render: h => h(App),
//   // render:function(h){
//   //   return h(App)
//   // }
// }).$mount('#app')

new Vue({
  data:{
    msg1:"我是index.html中的模版",
    msg2:"我是template的模版内容"
  },
  el:"#app",
  template:"<h1>{{msg2}}</h1>",
  render: h => h(App)
})