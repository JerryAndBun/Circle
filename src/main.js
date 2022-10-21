import Vue from 'vue'
import App from './App.vue'
import request from './api/request'
import router from '../src/router/index'
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.scss'
import './assets/font_3193278_doewezsiyxk/iconfont.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
