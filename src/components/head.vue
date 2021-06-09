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
    <el-menu-item index="基金">基金</el-menu-item>
    <el-menu-item index="工具">工具</el-menu-item>
  </el-menu>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'head',
  setup() {
    let activeIndex = ref('');
    const router = useRouter();
    const route = useRoute();

    // 监听路由改变头部tab值
    watch(route, (now) => {
      switch (now.path) {
        case '/':
          activeIndex.value = '首页';
          break;
        case '/list':
          activeIndex.value = '申购记录';
          break;
        case '/qs':
          activeIndex.value = '券商';
          break;
        case '/jiJin':
          activeIndex.value = '基金';
          break;
        case '工具':
          activeIndex.value = '工具';
          break;
      }
    });

    /**
     * 点击头部菜单跳转
     * @param key
     * @param keyPath
     */
    function handleSelect(key, keyPath) {
      switch (key) {
        case '首页':
          router.push('/')
          break;
        case '申购记录':
          router.push('/list')
          break;
        case '券商':
          router.push('/qs')
          break;
        case '基金':
          router.push('/jiJin')
          break;
        case '工具':
          router.push('/')
          break;
      }
    }

    return {
      activeIndex,
      handleSelect,
    }
  }
}
</script>
