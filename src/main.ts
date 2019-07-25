import Vue from 'vue'
import App from './App.vue'
import store from './store'
import jquery from 'jquery'

Vue.config.productionTip = false

declare global {
  interface Window {
    $: jquery
  }
}

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
