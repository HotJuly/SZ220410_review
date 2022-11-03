<template>
  <div id="app">
    <router-view></router-view>
    <router-link to="/home">toHome</router-link>
    <!-- <router-link to="/about">toAbout</router-link> -->
    <button @click="toAbout">toAbout</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted(){
    console.log(this.$router,this.$route)
  },
  methods:{
    toAbout(){
      this.$router.replace("/about")
    }
  }
}
</script>

<style>
</style>
