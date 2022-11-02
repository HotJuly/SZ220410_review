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
  data(){
    return{
      data1:6
    }
  },
  methods:{
    a(){
      console.log('a')
    }
  },
  mounted(){
    // 找到父组件的实例对象,就相当于是父组件代码中的this
    // console.log('parent',this.$parent.msg)

    // console.log('root',this.$root.msg3)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
