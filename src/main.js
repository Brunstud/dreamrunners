import Vue from 'vue';
import App from './App.vue';
import router from './router'; 
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
require('./mock');
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router, // 将VueRouter实例注入到Vue实例中
  store, // 全局变量
}).$mount('#app')
