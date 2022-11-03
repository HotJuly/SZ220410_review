<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <slot name="default"></slot>
    <slot name="header"></slot>
    <slot name="footer" :msg1="msg1"></slot>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      msg1:"hello,大家好"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
