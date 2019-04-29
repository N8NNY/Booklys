import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'

import firebase from 'firebase'

import Snotify from 'vue-snotify';
// You also need to import the styles. If you're using webpack's css-loader, you can do so here:
import 'vue-snotify/styles/material.css'; // or dark.css or simple.css

Vue.use(Snotify);
Vue.config.productionTip = false


Vue.config.productionTip = false

/*new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    })
  }
}).$mount('#app')*/

const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
  new Vue({
    router,
    store,
    Snotify,
    render: h => h(App),
    created () {
      store.dispatch('autoSignIn', firebaseUser)
      this.$store.dispatch('loadBook')
      this.$store.dispatch('checkNoti')
     
    }
  }).$mount('#app')
   unsubscribe()
})