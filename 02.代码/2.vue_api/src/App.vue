<template>
  <div id="app">
    <h1>{{arr[2]}}</h1>
    <button @click="clickHandler">修改数据</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      arr:[1,2,3]
    }
  },
  methods:{
    clickHandler(){
      // this.arr[2] = 7;
      // this.arr.splice(2,1,7)
      var data = [3,4,5]
      // data.splice(2,1,7)
      console.log(this.arr,data)
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
