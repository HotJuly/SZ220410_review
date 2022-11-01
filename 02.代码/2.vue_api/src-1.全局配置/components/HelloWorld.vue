<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
// vue文件暴露出去的是一个配置对象
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  a:2,
  mounted(){
    // Object.assign(this.$data,this.$options.data())
    console.log('Hello',this.$options.a)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
