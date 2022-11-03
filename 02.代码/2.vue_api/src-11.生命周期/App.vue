<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
      msg:123
    }
  },
  beforeCreate(){
    // console.log('--------beforeCreate--------',this,this.$data,this.msg,this.$el)
    console.log('--------App beforeCreate--------')
  },
  created(){
    // console.log('--------created--------',this,this.$data,this.msg,this.$el)
    console.log('--------App created--------')
  },
  beforeMount(){
    // console.log('--------beforeMount--------',this,this.$data,this.msg,this.$el)

    // 通过以下代码打印,可以得知,beforeMount之前是不会生成VNode
    // console.log('--------beforeMount--------',this.$vnode,this._vnode)
    console.log('--------App beforeMount--------')
  },
  mounted(){
    // console.log('--------mounted--------',this,this.$data,this.msg,this.$el)
    console.log('--------App mounted--------')
  },
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
