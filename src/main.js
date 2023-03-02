/*
  Module imports
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://api.provaltec.cl'
axios.defaults.headers.common['token'] = localStorage.getItem('token')
axios.defaults.headers.post['Content-Type'] = 'application/json'

/* Inicializacion del proyecto */
Vue.config.productionTip = false
new Vue({
  router,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
