import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: process.env.NODE_ENV === 'development',
  connection: 'http://localhost:8081',
  vuex: {
    store: store,
    actionPrefix: 'SOCKET_'
  }
}))

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
