const webpack = require("webpack");
const path = require("path");
const resolve = (dir) => require("path").join(__dirname, dir);

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  // 禁止eslint
  lintOnSave: false,
  // 更改输出文件夹,把原来的dist改成docs
  outputDir: "docs",
  // 服务器目录
  publicPath:
    process.env.NODE_ENV === "production" ? "/-Hong-Kong-stocks/" : "/",

  // 反向代理
  devServer: {
    proxy: "https://www.xinguyufu.cn", // api地址
  },

  configureWebpack: (config) => {
    config.plugins.push(
      // 配置jquery为$和jQuery通配符
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        mapState: ["vuex", "mapState"],
        mapGetters: ["vuex", "mapGetters"],
      })
    );
    // if (process.env.NODE_ENV === "production") {
    //   new TerserPlugin({
    //     cache: true,
    //     parallel: true,
    //     sourceMap: true,
    //     terserOptions: {
    //       compress: {
    //         drop_debugger: true,
    //         drop_console: true, //生产环境自动删除console
    //       },
    //     },
    //   });
    // }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, "./src/assets/const.less"),
        path.resolve(__dirname, "./src/assets/mixins.less"),
      ],
    },
  },
};
