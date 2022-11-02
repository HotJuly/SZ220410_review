<template>
  <div id="app">
    <h1 v-pre>App的title:{{title}}</h1>
    <h1 v-once>App的title:{{title}}</h1>
    <!-- <HelloWorld :title.sync="title" msg="Welcome to Your Vue.js App"/> -->
    <!-- 以上代码等同于以下代码 -->
    <HelloWorld 
    :title="title"
    @update:title="(data)=>title=data"
    msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      title:"我是APP"
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    // console.log(2)
    // this.$bus.$emit('sendMsg',678)

    // this.$destroy();
    // console.log(2)
    this.title="666"
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
