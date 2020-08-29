<template>
  <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">新股</el-menu-item>
    <el-menu-item index="3">券商</el-menu-item>
    <el-menu-item index="4">文章</el-menu-item>
    <el-menu-item index="5">工具</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>