<template>
  <div id="app">
    <AppNavbar/>
    <AppMusical/>
    <AppLanguage/>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <TestApi msg="Welcome to Your Vue.js App"/> -->
    <router-view /> <!-- 这里会渲染匹配的组件 -->
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue';
import AppMusical from './components/Musical.vue';
import AppLanguage from './components/Language.vue';
//import TestApi from './components/TestApi.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,//注册导航栏组件
    AppMusical, //背景音乐
    AppLanguage,//全局语言
    //TestApi,//用户get&post组件
  },
};
</script>

<!-- 
<style>
#app {
  background: url("./assets/background1.png");
  background-size: cover; /* 使用 'cover' 来扩展背景图到整个网页 */
  height: 100vh; /* 设置高度为视窗高度，使背景充满整个网页 */
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  margin: 0; /* 移除顶部的间距 */
  padding: 0; /* 移除内部的间距 */
}
</style>
 -->