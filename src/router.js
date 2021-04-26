import { createWebHashHistory, createRouter } from "vue-router";
import NProgress from 'nprogress'
import "nprogress/nprogress.css";

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import("./views/index.vue"),
  },
  {
    path: '/qs',
    name: 'qs',
    component: () => import("./views/qs.vue"),
  },
  {
    path: '/list',
    name: 'list',
    component: () => import("./views/list.vue"),
  },
  // 配置404页面
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: () => import("./views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 配置页面加载过度条
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
