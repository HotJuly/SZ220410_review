<template>
  <div id="app">
    <!-- <keep-alive include="A"> -->
    <keep-alive exclude="A">
      <AVue v-if="isShow"/>
      <BVue v-else/>
    </keep-alive>

    <button @click="changeShow">切换组件</button>
  </div>
</template>

<script>
import AVue from './components/A.vue';
import BVue from './components/B.vue';

export default {
  name: 'App',
  data(){
    return{
      isShow:true
    }
  },
  methods:{
    changeShow(){
      this.isShow=!this.isShow
    }
  },
  components: {
    AVue,
    BVue,
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
