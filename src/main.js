import { createApp } from 'vue'
import App from './App.vue'

import ElementUi from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import router from './router';

import "normalize.css";
import "animate.css";

// 将jquery挂载到全局windows
import $ from "jquery";
window.$ = $;
// 将lodash挂载到全局windows
import _ from "lodash";
window._ = _;

createApp(App)
    .use(ElementUi)
    .use(router)
    .mount('#app')
