<template>
  <div id="app">
      <button v-if="!isEdit" @click="changeEdit">添加</button>
      <input ref="input678" v-else type="text">
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      isEdit:false
    }
  },
  components: {
    HelloWorld
  },
  methods:{
    changeEdit(){
      /*
        面试题:请问Vue更新数据是同步更新还是异步更新?
          同步更新
      
        面试题2:请问Vue更新DOM是同步更新还是异步更新?
          异步更新

        nextTick
          语法:在调用函数的时候,传入一个回调函数即可

          返回值:如果没传入回调函数,就是promise对象

          用处:当组件的DOM更新之后,才会执行传入的回调函数
            也就是说,在回调函数中,一定可以获取到当前最新的DOM节点

          原理:通过异步任务延迟回调函数的执行,严格来说是微任务
            其实nextTick使用.then实现的

          注意:
            1.其实在更新状态数据的时候,DOM更新用到了nextTick
              也就是说,更新DOM是微任务

            2.不要在更新数据之前调用nextTick,因为这样无法获取到最新的DOM节点

      */

      this.isEdit = true;

      this.$nextTick(()=>{
        this.$refs.input678.focus();
      })


      
      // 这里似乎有一个看不见的nextTick

      // Promise.resolve().then(()=>{
      //   console.log(1)
      // })

      // this.isEdit = true;

      // this.$nextTick(()=>{
      //   console.log(2)
      // })

      // Promise.resolve().then(()=>{
      //   console.log(3)
      // })

      // this.$nextTick(()=>{
      //   console.log(4)
      // })

    }
  },
  mounted(){

    // console.log(1,this.isEdit)
    // this.isEdit = false;
    // console.log(2,this.isEdit)
    // debugger
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
