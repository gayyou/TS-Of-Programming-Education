import Vue from 'vue'
import App from './App.vue'
import store from './store'
import jquery from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(ElementUI);

axios.defaults.timeout = 50000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '' : 'http://qgstudio.org:11291';

declare global {
  interface Window {
    $: any,
    vue: any
  }
  interface Vue {
    $: any
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: any
  }
}

window.$ = jquery;
Vue.prototype.$http = axios;

window.vue = new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
