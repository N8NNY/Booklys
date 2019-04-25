import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    //
    userSignIn({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', firebaseUser)
          commit('setLoading', false)
          commit('setError', null)
          alert('เข้าสู่ระบบสำเร็จ')
          router.push('/');
          
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
          alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
        })
        
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', payload)
     },
     userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      alert('ออกจากระบบสำเร็จ')
      router.push('/login')
    },
    changeToSignUpPage(){
      router.push('/signup')
    },
    
      userSignUp ({commit}, payload) {
        commit('setLoading', true)
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(firebaseUser => {
            commit('setUser', firebaseUser)
            commit('setLoading', false)
            router.push('/')
          })
          .catch(error => {
            commit('setError', error.message)
            commit('setLoading', false)
          })
      }
    
   //
  }
})
