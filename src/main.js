import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'

import firebase from 'firebase'
// eslint-disable-next-line no-unused-vars
import {app} from '@/config'

import Snotify from 'vue-snotify'

// Import notify styles
import 'vue-snotify/styles/material.css'

// Tell Vue about Snotify
Vue.use(Snotify)

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
    beforeCreate() {
      Vue.$snotify = this.$snotify;
    },
    created () {
      store.dispatch('autoSignIn', firebaseUser)
      this.$store.dispatch('loadBook')
      //this.$store.dispatch('checkNoti')
     
    }
  }).$mount('#app')
   unsubscribe()
})