import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase'
import {firebaseConfig} from './config'

firebase.initializeApp(firebaseConfig);
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
    render: h => h(App),
    created () {
      store.dispatch('autoSignIn', firebaseUser)
      /*if(this.$store.state.loading){
        this.$store.dispatch('loadBook')
      }*/ 
      this.$store.dispatch('loadBook')
     
    }
  }).$mount('#app')
   unsubscribe()
})