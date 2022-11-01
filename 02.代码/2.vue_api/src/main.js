import Vue from 'vue'
import App from './App.vue'
// import HelloWorld from '@/components/HelloWorld';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


// var HelloComponent = Vue.extend(HelloWorld)
// // 创建 Profile 实例，并挂载到一个元素上。
// var vm = new HelloComponent();
// console.log(vm)
// vm.$mount('#app')