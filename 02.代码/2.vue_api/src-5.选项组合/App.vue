<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h2>age:{{user.age}}</h2>
    <h2>APP的name:{{_provided.user.name}}</h2>
  </div>
</template>

<script>
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      user:{
        age:23
      }
    }
  },
  // provide:{
  //   data1:"我是App组件的provide数据"
  // }
  provide(){
    // provide中,函数的this是当前组件的实例对象
    return Vue.observable({
      data1:"我是App组件的provide数据",
      user:{
        name:"xiaoming",
        ...this.user
      }
    })
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
