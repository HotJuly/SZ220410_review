<template>
    <el-tooltip class="item" effect="dark" :content="title" placement="left-start">
        <!-- <el-button size="small" type="primary">左上</el-button> -->
        <!-- <el-button :size="size" :type="type">左上</el-button> -->
        <el-button v-bind="$attrs" v-on="$listeners">左上</el-button>
        <!-- <el-button v-bind="$attrs" @click="fn">左上</el-button> -->
    </el-tooltip>
</template>
  
<script>
export default {
    name: 'HintButton',
    // props:["size","type","title"]
    props:["title"],
    mounted(){
        console.log(this.$attrs,this.$listeners)
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  