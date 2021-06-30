// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
// 导入字体样式表
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import Vuex from 'vuex'
import echarts from 'echarts'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8090/'
axios.interceptors.request.use(config => {
  // config.headers.Authorization = window.sessionStorage.getItem('token')
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios;
Vue.prototype.$qs = Qs
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
