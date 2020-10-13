import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueLazyload from "vue-lazyload";
import NProgress from "nprogress";
import ElementUI from "element-ui";
import { Message } from "element-ui";

import "normalize.css";
import "animate.css";
import "nprogress/nprogress.css";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

// 设置默认请求地址
// axios.defaults.baseURL = 'http://10.10.90.36:8000/api';
// 设置默认请求格式
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
Vue.use(VueAxios, axios);

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 配置token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 请求失败
    if (response.statusText !== "OK") {
      Message(
        (response.data.data && response.data.data.message) ||
          "请求失败请稍后重试！"
      );
      throw response;
    }
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    Message("请求失败请稍后重试！");
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 配置页面加载过度条
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

// 引入elementUI框架
Vue.use(ElementUI);

// 路由懒加载
Vue.use(VueLazyload, {
  preLoad: 1,
  error: "/lazyloadImg/404.png",
  loading: "/lazyloadImg/loading.gif",
  try: 1, // default 1
});

// 添加bus集中处理简单的非父子组件通信,不建议依赖此功能,复杂情况应该走vuex
const Bus = new Vue();

const $vue = new Vue({
  data: {
    Bus,
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.$vue = $vue;
