<template>
  <div id="app">
    <myHead></myHead>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1400px;
  margin: 0 auto;
}
</style>

<script>
import myHead from '@/components/head';
export default {
  name: 'app',
  components: {
    myHead,
  }
}
</script>