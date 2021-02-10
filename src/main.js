// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
// 导入字体样式表
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8080/'
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
