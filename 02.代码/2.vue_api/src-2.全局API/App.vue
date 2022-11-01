<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h1>name:{{ user.name }}</h1>
    <!-- <h1>age:{{ user.age | myFilter }}</h1> -->
    <HelloWorld msg="hello"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      msg: "我是初始数据",
      user: {
        name: "xiaoming",
        age:28
      }
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    /*
      响应式属性
        定义:
          当某个属性的值被修改之后,页面会展示出最新的结果
          反之,如果修改某个属性,结果页面没有显示出最新的值,那么就说明当前属性是一个非响应式属性

        创建时机:
          1.当组件初始化的时候,会将data函数返回的对象变为响应式对象
              data对象中所有的属性都会变成响应式属性

          2.当修改某个响应式属性的值的时候,如果属性值是一个对象,
            那么该对象中所有的属性都会变成响应式属性

        如何将非响应式属性变为响应式的
          1.Vue.set
          2.vm.$set
          3.Vue.observable

        如何快速分辨一个属性是否是响应式属性?
          直接打印具有属性的对象,如果该属性是直接显示原值,那一定不是响应式属性
              如果打印结果是...,那么就是响应式属性

        Vue响应式的BUG
          1.新增一个属性,该属性不会是响应式的
          2.使用delete关键字删除一个属性,属性值会被删除,但是没有响应式效果
    */

    // this.msg = "我是修改之后的数据"

    // this.user.name = "xiaohong"
    // this.user.age = 23;

    // console.log(this.user)

    // this.user = {
    //   ...this.user,
    //   age:23
    // }
    // this.$set(this.user,"age",23)

    // setTimeout(()=>{
    //   this.user.age = 28;
    // },2000)


    // this.user = {
    //   name: "xiaoming"
    // }

    // this.user.age = 23;

    // setTimeout(() => {
    //   this.user.age = 28;
    //   console.log(this.user)
    // }, 2000)

    //--------------------------------
    // delete this.user.name;
    // this.$delete(this.user, "name")
    // console.log(this.user)

    //----------------------------
    // console.log(this.$options.name)
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
