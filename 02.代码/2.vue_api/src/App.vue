<template>
  <div id="app">
    <h1>App的data1:{{data1}}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" v-model="data1"/>
    <!-- 以上代码原理等同于以下代码 -->
    <!-- <HelloWorld 
    msg="Welcome to Your Vue.js App"
    :value="data1"
    @input="(data)=>data1=data"
    /> -->
    
    <!-- <input type="text" v-model="msg1"> -->
    <!-- 以上代码原理等同于以下代码 -->
    <input type="text" :value="msg1" @input="(event)=>msg1=event.target.value">
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      data1:"我是App组件的数据",
      msg1:"1234"
    }
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
