<template>
    <div style="width: 100vw;height: 100vh;background: #fff;overflow: hidden;">
        <img src="../assets/404.png" alt="" class="img"/>
        <div class="nof">页面丢失，这是一个 404 错误页面。</div>
        <div class="nof-text">网络错误 / 页面已被删除 / 被大量访问</div>
        <div style="text-align: center;">
            <router-link :to="{ name: 'index' }"><el-button type="primary" style="width: 100px;">回到首页</el-button></router-link>
        </div>
    </div>
</template>

<script>
</script>

<style scoped lang="less">
    .img{
        width: 950px;
        height: 462px;
        display: block;
        margin: 129px auto 70px;
    }
    .nof{
        font-size: 32px;
        color: #1B3143;
        padding-bottom: 40px;
        text-align: center;
    }
    .nof-text{
        font-size: 16px;
        color: #1B3143;
        opacity: 0.3;
        text-align: center;
        padding-bottom: 80px;
    }
</style>
