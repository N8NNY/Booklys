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
    displayname: null,
    point: 0,
    favoritepost: null
  },
  book:{
    bookname: null,
    description: null,
    imgurl: null,
    index: 0,
    owner: null,
    writter: null
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
      state.displayname = payload
    },
    setPoint(state,payload){
      state.point = payload
    },
    loadBook(state,payload){
      state.book = payload
    },
    
  },
  actions: {
    
    userSignIn({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', payload.email)
          commit('setLoading', false)
          commit('setError', null)
          alert('เข้าสู่ระบบสำเร็จ')
          loadBook()
          var user = firebase.auth().currentUser;
          var date_lastlogin
          var date = Date(Date.now())
          var date_now = date.toString()
          var date_now_substring = date_now.substring(0,15)
          var date_lastlogin_substring
          var user_point =0
          var displayName
          var userRef = firebase.database().ref("User")
          userRef.orderByChild("point").on("child_added",function(data){
            console.log(data.val().displayname);
          })
          var firebaseRef = firebase.database().ref("User").child(user.uid);
          //console.log(user.uid)
            console.log("User ID is :"+user.uid)
            firebaseRef.on('value' , function(dataSnapshot) {
            date_lastlogin = dataSnapshot.val().lastlogindate
            date_lastlogin_substring = date_lastlogin.substring(0,15)
            //console.log("last login time : " + date_lastlogin)
            displayName = dataSnapshot.val().displayname
            console.log('dname '+displayName);
            //console.log("last "+date_lastlogin_substring);
            });
            //console.log(date_lastlogin_substring == date_now_substring)
           //console.log("last "+date_lastlogin_substring);
           console.log("now "+date_now_substring);
           
        
           firebaseRef.on('value' , function(dataSnapshot) {
            user_point = dataSnapshot.val().point
            console.log(user_point);
            
            commit('setPoint',user_point)
            commit('setDisplayName',displayName)
            });

           var delayInMilliseconds = 1500;
           setTimeout(function(){
            if(date_lastlogin_substring == date_now_substring)
            {
                //console.log(date_lastlogin_substring == date_now_substring)
                 firebaseRef.update({
                     "lastlogindate":date_now
                    })
                    router.push('/')    
            }
            else
            { 
              user_point+=100
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
           },delayInMilliseconds)
           
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
            commit('setDisplayName',data.displayname)
            userRef.child(useruid).set(data)
            router.push('/')
          })
          .catch(error => {
            commit('setError', error.message)
            commit('setLoading', false)
          })
      },
      loadBook(){
        var bookRef = firebase.database().ref("BookCard").orderByValue('index').once('value').then((data) => {
            const bookcard =[]
            const obj = data.val()
            for(let key in obj){
              bookcard.push({
                id: key,
                bookname: obj[key].bookname,
                description: obj[key].description,
                imgurl: obj[key].imgurl,
                index:obj[key].index,
                owner:obj[key].owner,
                writter:obj[key].writter
              })
            }
            commit('loadBook',bookcard)
        }).catch(
          (error) => {
            console.log(error)
          }
        )
       
      }
  }
})
