import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
  user: "",
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
