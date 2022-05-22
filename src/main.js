import Vue from 'vue'
import App from './App.vue'
import request from './api/request'
import router from '../src/router/index'
import store from './store/index';
import './assets/css/global.scss'
Vue.config.productionTip = false

new Vue({
  
  render: h => h(App),
  router,
  store,
}).$mount('#app')
