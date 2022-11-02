<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 @click="changeTitle">子组件的title:{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    title:String
  },
  methods:{
    changeTitle(){
      this.$emit('update:title','修改成功了')
    }
  },
  mounted(){
    // console.log(1)
    this.$bus.$on('sendMsg',(data)=>{
      console.log('data',data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
