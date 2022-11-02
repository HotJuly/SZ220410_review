<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" :a="a" :b="b" :c="c"/> -->
    <!-- v-bind可以接收一个对象,对象中的属性名会变为标签属性名,属性值就是标签属性值 -->
    <!-- <HelloWorld 
    msg="Welcome to Your Vue.js App"
    v-bind="{
      a,
      b,
      c
    }"
    /> -->
    <!-- <HelloWorld 
    msg="Welcome to Your Vue.js App"
    v-bind="$data"
    @click="handler1"
    /> -->

    <HintButtonVue size="big" type="danger" title="删除" @click="handler1"/>
    <HintButtonVue size="small" type="primary" title="编辑"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HintButtonVue from './components/HintButton.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    HintButtonVue
  },
  data(){
    return{
      a:1,
      b:2,
      c:3
    }
  },
  mounted(){
  },
  methods:{
    handler1(){
      console.log('handler1')
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
