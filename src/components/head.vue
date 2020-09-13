<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item index="首页">首页</el-menu-item>
    <el-menu-item index="申购记录">申购记录</el-menu-item>
    <el-menu-item index="券商">券商</el-menu-item>
    <el-menu-item index="文章">文章</el-menu-item>
    <el-menu-item index="工具">工具</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case '首页':
          this.$router.push('/')
          break;
        case '申购记录':
          this.$router.push('/list')
          break;
        case '券商':
          this.$router.push('/')
          break;
        case '文章':
          this.$router.push('/')
          break;
        case '工具':
          this.$router.push('/')
          break;
      }
      console.log(key, keyPath);
    }
  },
  mounted() {
    // 获取url判断路由,没有用$route,因为组件可能还没渲染完成
    const routeName = window.location.pathname;
    switch (routeName) {
      case '/':
        this.activeIndex = '首页';
        break;
      case '/list':
        this.activeIndex = '申购记录';
        break;
      case '券商':
        this.activeIndex = '券商';
        break;
      case '文章':
        this.activeIndex = '文章';
        break;
      case '工具':
        this.activeIndex = '工具';
        break;
    }

  }
}
</script>