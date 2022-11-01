import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true

/*
  需求:将所有组件配置对象中的a属性,数值进行+1操作
  通过自定义合并策略,可以一次性修改所有组件的配置对象内容
*/

// Vue.config.optionMergeStrategies.a = function (parent, child) {
//   // console.log(parent, child, vm)
//   return child + 1
// }

/*
  需求:请问你在开发的时候,是如何捕获项目中出现的报错的?
    1.try{...}catch(){}
    2.Promise的catch方法
    3.errorCaptured(专门用于捕获后代组件报错)
    4.Vue.config.errorHandler
      可以捕获到当前项目中出现的所有报错

  面试题:请问在项目上线之后,你是如何知道项目出现了哪些BUG的?
    项目上线之后,会运行在用户的电脑上,如何知道用户电脑出现了什么问题

    流程:
      1.在项目中,使用以上方法捕获到用户出现的报错信息情况
      2.在报错信息得到之后,我们在网页中,使用ajax将相关的数据发送给公司指定服务器
      3.公司服务器汇总出现的报错信息,交给对应的开发人员进行处理
*/
Vue.config.ignoredElements = [
  "About"
]

// Vue.config.errorHandler = function(err, vm, info){
//   console.log(err, vm, info)
// }

new Vue({
  render: h => h(App),
}).$mount('#app')
