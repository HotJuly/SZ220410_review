<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>data1:{{ data1 }}</h1>
    <!-- <h1>user11111111:{{ user }}</h1> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  inject:["data1","user"],
  mounted(){
    // setTimeout(()=>{
    //   this.data1 = "我是hello的inject数据"
    // },2000)

    setTimeout(()=>{
      this.user.name = "我是hello的name"
    },2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
