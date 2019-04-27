/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: null,
    error: null,
    loading: false,
    psw: null,
    dname: null,
    point: 0,
    favoritepost: null
  },
  mutations: {
    setUser (state, payload) {
      state.email = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setPassword (state,payload){
      state.psw = payload
    },
    setDisplayName(state,payload){
      state.dname = payload
    },
    setPoint(state,payload){
      state.point = payload
    }
  },
  actions: {
    
    userSignIn({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          //console.log('FireUser is :'+firebaseUser);
          
          commit('setUser', payload.email)
          commit('setLoading', false)
          commit('setError', null)
          
          alert('เข้าสู่ระบบสำเร็จ')
          var user = firebase.auth().currentUser;
          //console.log("User is :"+user)
          var date_lastlogin
          var date = Date(Date.now())
          var date_now = date.toString()
          var date_now_substring = date_now.substring(0,15)
          var date_lastlogin_substring
          var user_point =0
          var firebaseRef = firebase.database().ref("User").child(user.uid);
          console.log(user.uid)
            console.log("User ID is :"+user.uid)
            firebaseRef.on('value' , function(dataSnapshot) {
            date_lastlogin = dataSnapshot.val().lastlogindate
            date_lastlogin_substring = date_lastlogin.substring(0,15)
            console.log("last login time : " + date_lastlogin)
            });
            //console.log(date_lastlogin_substring == date_now_substring)
            if(date_lastlogin_substring == date_now_substring)
            {
                //console.log(date_lastlogin_substring == date_now_substring)
                 firebaseRef.update({
                     "lastlogindate":date_now
                    })
            }
            else
            { 
                firebaseRef.on('value' , function(dataSnapshot) {
                user_point = dataSnapshot.val().point
                console.log(user_point);
                user_point+=100
                commit('setPoint',user_point)
                });
                var delayInMilliseconds = 1500; //3 second
                    setTimeout(function(){  
                    alert("รางวัลล็อกอินรายวัน + 100 points!!!")
                    firebaseRef.update({
                        "point":user_point,
                        "lastlogindate":date_now
                    })
                },delayInMilliseconds)
                router.push('/')
            }
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
      userSignUp ({commit}, payload) {
        commit('setLoading', true)
        var database = firebase.database()
        var userRef = database.ref('User')
        var date = Date(Date.now())
        var date_now = date.toString()
        var useruid
        const data = {
          email: payload.email,
          displayname: payload.displayname,
          lastlogindate:date_now,
          psw: payload.password,
          //favoritepost: payload.favoritepost,
          point: 100
        }

        //commit('userSignUp',data)
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(firebaseUser => {
            useruid = firebaseUser.user.uid;
            commit('setUser', payload.email)
            commit('setLoading', false)
            alert('ลงทะเบียนสำเร็จ')
            commit('setPoint',data.point)
            userRef.child(useruid).set(data)
            router.push('/')
          })
          .catch(error => {
            commit('setError', error.message)
            commit('setLoading', false)
          })
      },
  }
})
