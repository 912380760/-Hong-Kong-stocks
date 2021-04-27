# -Hong-Kong-stocks
港股打新分析和记录

## vue3 + vite 构建
- 安装依赖: yarn or npm install
- 开发模式: yarn dev 
- 生产打包: yarn build
- 打包测试: yarn serve

## github page
在vite.config.js配置了
```javascript
{
    build: {
        // 打包输出地址
        outDir: 'docs',
    },
    // 静态资源服务
    base: '/-Hong-Kong-stocks/'
}
```
