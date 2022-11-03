<template>
  <div id="app">
    <ul>
      <li v-for="(item, index) in arr" :key="index">
        <label>{{ item }} - </label>
        <input type="text">
      </li>
    </ul>
    <button @click="changeNum">修改数据</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      arr: [1, 2, 3, 4, 5]
    }
  },
  methods:{
    changeNum(){
      this.arr.splice(1,0,6);
    }
  }
}
</script>

<style>
</style>
