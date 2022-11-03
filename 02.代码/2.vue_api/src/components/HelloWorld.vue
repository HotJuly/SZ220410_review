<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  beforeCreate(){
    console.log('--------Hello beforeCreate--------')
  },
  created(){
    console.log('--------Hello created--------')
  },
  beforeMount(){

    console.log('--------Hello beforeMount--------')
  },
  mounted(){
    console.log('--------Hello mounted--------')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
