<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" :fn="$options.fn1"/>
    <!-- <HelloWorld/> -->
    <h2>{{user.name}}</h2>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      num:0,
      /*
        需求:现在有一个数据需要存放在data中,但是不希望这个数据是响应式的
          1.给某些属性添加_或者$开头
          2.可以通过Object.freeze方法冻结该对象,那么该对象中所有的属性会变为只读属性
            就会丧失响应式的特点
      */
      _a:666,
      user:Object.freeze({
        name:"xiaoming"
      })
    }
  },
  components: {
    HelloWorld
  },
  fn1(value){
      console.log(this,value)
  },
  methods:{
    // 声明在methods中的方法,this一定是当前组件的实例对象
    fn(value){
      // console.log(value)
      this.num = value;
      console.log(this,this.num)
    }
  },
  mounted(){
    console.log(this._a)
    setTimeout(()=>{
      this.user.name="xiaowang"
    },2000)
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
