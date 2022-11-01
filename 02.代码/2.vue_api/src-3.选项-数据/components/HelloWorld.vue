<template>
  <div class="hello">
    <h1 @click="clickHandler">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props:["msg"]
  // props:{
  //   msg:String
  // }
  props:{
    msg:{
      type:String,
      // default:"hello",
      // require:true
    },
    fn:Function
  },
  methods:{
    clickHandler(){
      this.fn(666)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
