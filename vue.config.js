const webpack = require('webpack');
const path = require('path');
const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
    // 禁止eslint
    lintOnSave: false,
    // 更改输出文件夹,把原来的dist改成docs
    outputDir: 'docs',
    // 服务器目录
    publicPath: process.env.NODE_ENV === 'production'
        ? '/-Hong-Kong-stocks/'
        : '/',

    // 反向代理
    devServer: {
        proxy: 'http://106.52.151.73', // api地址
    },
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

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
            path.resolve(__dirname, './src/assets/const.less'),
            path.resolve(__dirname, './src/assets/mixins.less'),
        ]
      }
    },
};
