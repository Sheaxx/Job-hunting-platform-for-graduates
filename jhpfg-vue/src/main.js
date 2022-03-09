import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIO from 'vue-socket.io';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';
Vue.prototype.$ajax= axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(new VueSocketIO({
  debug: true,
  // 服务器端地址
  connection: "http://localhost:3000",
}))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
