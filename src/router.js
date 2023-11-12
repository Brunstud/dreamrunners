// src/router.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue'; // 正确导入 Home 组件

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home }, // Home 是主页面的组件
  { path: '/main', component: () => import('./views/Main.vue') },
  { path: '/latterns/:id', component: () => import('./views/LatternsCatch.vue'), props: true },
  { path: '/fly-latterns', component: () => import('./views/LatternsFly.vue') },
  { path: '/regist', component: () => import('./views/Regist.vue') },
  { path: '/login', component: () => import('./views/Login.vue') },
  { path: '/user', component: () => import('./views/User.vue') },
];

const router = new VueRouter({
  routes,
  mode: 'history', // 使用历史模式路由
});

export default router;