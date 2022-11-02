<template>
    <div class="big">
        <el-image 
        v-show="false"
        ref="image1"
        style="width: 100px; height: 100px" 
        :src="url" 
        :preview-src-list="srcList">
        </el-image>
        <!-- <button @click="showBigImage">查看</button> -->
        <slot name="content" :click="showBigImage"></slot>
    </div>
</template>
  
<script>
export default {
    name: 'BigImage',
    data() {
      return {
      }
    },
    props:["url","srcList"],
    methods:{
        showBigImage(){
            // console.log('showBigImage',this.$refs.image1)
            this.$refs.image1.clickHandler();
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  