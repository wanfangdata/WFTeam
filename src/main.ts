import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import 'font-awesome/css/font-awesome.css'
import 'github-markdown-css/github-markdown.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

router.beforeEach((to, from, next) => {
  // 判断用户登录状态
  if (!localStorage.apikey && to.name != 'Login') {
    next('/login');
  }
  else if (!!localStorage.apikey && to.name == 'Login') {
    axios.defaults.headers.common['apikey'] = localStorage.apikey;
    next('/');
  }
  else {
    axios.defaults.headers.common['apikey'] = localStorage.apikey;
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
