import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase'
import {firebaseConfig} from './config'

firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
