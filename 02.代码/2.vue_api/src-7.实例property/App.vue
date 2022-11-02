<template>
  <div id="app">
    <!-- <h1 ref="h1">我是h1标签</h1>
    <HelloWorld ref="hello1" msg="Welcome to Your Vue.js App"/> -->
    <BigImage />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BigImage
  },
  data(){
    return{
      msg:123
    }
  },
  mounted(){
    // console.log(this.$children)
    // console.log(this.$refs.h1)
    // console.log(this.$refs.hello1.data1)
    // this.$refs.hello1.a();
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
