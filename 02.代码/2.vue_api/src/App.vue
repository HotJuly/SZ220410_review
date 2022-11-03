<template>
  <div id="app">
    <!-- <h1>{{arr[2]}}</h1> -->
    <h1 v-if="show1" ref="h1">h1</h1>
    <h2 v-if="show2" ref="h2">h2</h2>
    <h3 v-if="show3" ref="h3">h3</h3>
    <!-- <button @click="clickHandler">修改数据</button> -->
    <button @click="clickHandler1">修改页面</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      arr:[1,2,3],
      show1:true,
      show2:false,
      show3:false
    }
  },
  methods:{
    clickHandler(){
      // this.arr[2] = 7;
      // this.arr.splice(2,1,7)
      var data = [3,4,5]
      // data.splice(2,1,7)
      console.log(this.arr,data)
    },
    clickHandler1(){


      this.show2=true;

      this.$nextTick(()=>{
        // console.log(this.$refs.h1)
        console.log(this.$refs.h2)
        console.log(this.$refs.h3)
      })
      
      this.show3=true;

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
