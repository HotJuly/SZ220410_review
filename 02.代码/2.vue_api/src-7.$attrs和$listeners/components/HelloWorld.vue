<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    a:Number
  },
  data(){
    return{
      data1:6
    }
  },
  mounted(){
    // console.log(this.$props,this.$attrs)
    console.log(this.$listeners)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
