// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import router from './router'

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
// .create({
//   baseURL: 'http://localhost:8000/api/'
// });
router.beforeEach((to, from, next) => {
  // 判断用户登录状态
  if (!localStorage.api_key && to.name != 'Login') {
    next('/login');
  }
  else if (!!localStorage.api_key && to.name == 'Login') {
    axios.defaults.headers.common['api_key'] = localStorage.api_key;
    next('/');
  }
  else {
    axios.defaults.headers.common['api_key'] = localStorage.api_key;
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
