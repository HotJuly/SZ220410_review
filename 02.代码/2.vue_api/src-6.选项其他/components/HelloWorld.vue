<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>data1:{{ data12345678 }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    data12345678:String,
    value:String
  },
  mounted(){
    this.$emit('input999','我是修改之后的数据')
  },
  model:{
    prop:"data12345678",
    event:"input999"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
