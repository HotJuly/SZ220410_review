<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App">
      <template v-slot:default>
        <h1>我是默认插槽</h1>
      </template>
      <template v-slot:header>
        <h1>我是header插槽</h1>
      </template>
      <template #footer="scope">
        <h1>我是footer插槽,{{scope.msg1}}</h1>
      </template>
    </HelloWorld> -->
    <BigImage v-bind="$data">
      <template v-slot:content="scope">
        <h1 v-on="scope">点我查看</h1>
      </template>
    </BigImage>

    <!-- <BigImage :url="url" :srcList="srcList">
      <template v-slot:content="scope">
        <h1 v-on="scope">点我查看</h1>
      </template>
    </BigImage> -->
  </div>
</template>

<script>
import BigImage from './components/BigImage.vue';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  },
  components: {
    HelloWorld,
    BigImage
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
