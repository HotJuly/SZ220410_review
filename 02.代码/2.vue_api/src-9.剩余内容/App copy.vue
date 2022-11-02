<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <AVue v-if="isShow"/>
    <BVue v-else/> -->

    <component :is="showComponent"></component>
    <button @click="changeShow">显示A组件</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import AVue from './components/A.vue';
import BVue from './components/B.vue';

export default {
  name: 'App',
  data(){
    return{
      isShow:true,
      showComponent:AVue
    }
  },
  methods:{
    changeShow(){
      // this.isShow=false
      this.showComponent = BVue;
    }
  },
  components: {
    // HelloWorld,
    // AVue,
    // BVue,
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
