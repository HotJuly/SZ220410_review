<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <About/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // 也就是说Vue会将配置对象.通过components属性将其变为对应的组件构造函数
  components: {
    HelloWorld
  },
  a:3,
  mounted(){
    // Object.assign(this.$data,this.$options.data())
    // console.log('App',this.$options.a,c)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
