## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 配置axios拦截,添加错误处理和token
```js
// main.js

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 配置token
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 请求失败
  if (response.statusText !== 'OK') {
    Message((response.data.data && response.data.data.message ) || '请求失败请稍后重试！');
    throw response;
  }
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  Message('请求失败请稍后重试！');
  // 对响应错误做点什么
  return Promise.reject(error);
});
```

### 配置less全局变量const.less文件
```js
// vue.config.js
const path = require('path');
module.exports = {
    // more
    
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
            path.resolve(__dirname, './src/assets/const.less'),
            path.resolve(__dirname, './src/assets/mixins.less'),
        ]
      }
    }
}    
```

### 配置反向代理解决跨域
```js
// vue.config.js
module.exports = {
    // more
    
    devServer: {
        proxy: 'http://106.52.151.73', // api地址
    },
}
```

### vue-cli自动配置了@ alias别名, 手动添加$ jQuery mapState mapGetters全局别名
```js
// vue.config.js
const webpack = require('webpack');
module.exports = {
    // more
    
    configureWebpack: {
        plugins: [
            // 配置jquery为$和jQuery通配符
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                mapState: ['vuex', 'mapState'],
                mapGetters: ['vuex', 'mapGetters'],
            }),
        ]
    },
}    
```
