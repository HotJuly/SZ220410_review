<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>pageX:{{pageX}}</h2>
    <h2>pageY:{{pageY}}</h2>
  </div>
</template>

<script>
import moveMixin from '@/mixins/moveMixin';
export default {
  name: 'HelloWorld',
  // data(){
  //   return{
  //     pageX:0,
  //     pageY:0
  //   }
  // },
  mixins:[moveMixin],
  props: {
    msg: String
  },
  // methods:{
  //   handler(event){
  //     // console.log(event)
  //     this.pageX = event.clientX;
  //     this.pageY = event.clientY;
  //   }
  // },
  mounted(){
    console.log('我是HelloWorld的mounted')
    this.a();
  },
  methods:{
    a(){
      console.log('我是组件的a')
    }
  },
  // beforeDestroy(){
  //   document.onmousemove=null;
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
