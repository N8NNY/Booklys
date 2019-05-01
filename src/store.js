/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'
// You also need to import the styles. If you're using webpack's css-loader, you can do so here:
import 'vue-snotify/styles/material.css';
// eslint-disable-next-line no-unused-vars
import {app} from '@/config'




Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: null,
    error: null,
    loading: false,
    psw: null,
    dname: null,
    displayname: null,
    point: 0,
    favoritepost: null,
    isnoti: false,
    bookcard:[],
    index : 0,
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
    getLoading(state){
      return state.loading
    },
    /* loadBook(state,payload){
      state.bookcard.push(payload)
    },*/
    setLoadedBook(state,payload){
      state.bookcard = payload
    },
    getLoadedBook(state){
      return state.bookcard 
    },
    setBookName(state,payload){
      state.bookcard.bookname = payload
    },
    setNoti(state,payload){
      state.isnoti = payload
    },
    getNoti(state){
      return state.isnoti
    },
    setIndex(state, payload) {
      state.index = payload
    }
  },
  actions: {
    updateBook({commit}){
      var bookRef = firebase.database().ref('BookCard')
      bookRef.on('value', function(snapshot){
      const bookcard =[]
      const obj = snapshot.val()
      let index = 0
      for(let key in obj){
        if (obj[key].index < index){
          index = obj[key].index
        }
        console.log('updateOBJ',obj[key])
        bookcard.push({
          id: key,
          bookname: obj[key].bookname,
          description: obj[key].description,
          imgurl: obj[key].imgurl,
          index: obj[key].index,
          owner: obj[key].owner,
          writter: obj[key].writter
        })
      }
      commit('setIndex', index)
      commit('setLoadedBook',bookcard)
      console.log('updatebook'+bookcard)
      })

    },

    setNoti({commit}){
      commit('setNoti',true)
      //alert(commit('getNoti'))
      //alert(this.state.isnoti)
      var user = firebase.auth().currentUser
      var userRef = firebase.database().ref("User").child(user.uid)
      userRef.update({
        "isnoti":true
      })
      
      /*userRef.on('value' , function(dataSnapshot) {
        notistatus = dataSnapshot.val().isnoti
        
        
      });*/
    },checkNoti({dispatch}){
      var notistatus
      var user = firebase.auth().currentUser
      var userRef = firebase.database().ref("User").child(user.uid)
      userRef.on('value' , function(dataSnapshot) {
        notistatus = dataSnapshot.val().isnoti
        
        
        if (notistatus == true){
        dispatch('displayNotification')
          //console.log('notistatus: '+notistatus);
        }
        else{
          console.log('fuckyou');
          
        }
      });

    },displayNotification() {
      // console.log('helloooooooooooooo');
      //vm.$snotify.success('Example body content');
    },
    loadBook({commit}){
      commit('setLoading', false)
          firebase.database().ref("BookCard").once('value').then((data) => {
          const bookcard =[]
          const obj = data.val()
          let index = 0
          for(let key in obj){
            if (obj[key].index < index){
              index = obj[key].index
            }
            bookcard.push({
              id: key,
              bookname: obj[key].bookname,
              description: obj[key].description,
              imgurl: obj[key].imgurl,
              index: obj[key].index,
              owner: obj[key].owner,
              writter: obj[key].writter
            })
          }
          commit('setIndex', index)
          commit('setLoading', true)
          commit('setLoadedBook',bookcard)
      }).catch(
        (error) => {
          console.log(error)
        }
      )
    },
    userSignIn({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          commit('setUser', payload.email)
          commit('setLoading', false)
          commit('setError', null)
          alert('เข้าสู่ระบบสำเร็จ')
          
          var user = firebase.auth().currentUser;
          var date_lastlogin
          var date = Date(Date.now())
          var date_now = date.toString()
          var date_now_substring = date_now.substring(0,15)
          var date_lastlogin_substring
          var user_point =0
          var displayName

          var firebaseRef = firebase.database().ref("User").child(user.uid);
          
            firebaseRef.on('value' , function(dataSnapshot) {
            date_lastlogin = dataSnapshot.val().lastlogindate
            date_lastlogin_substring = date_lastlogin.substring(0,15)
            displayName = dataSnapshot.val().displayname
            });
           firebaseRef.on('value' , function(dataSnapshot) {
            user_point = dataSnapshot.val().point
            commit('setPoint',user_point)
            commit('setDisplayName',displayName)
            });

           var delayInMilliseconds = 1500;
           setTimeout(function(){
            if(date_lastlogin_substring == date_now_substring)
            {
                 firebaseRef.update({
                     "lastlogindate":date_now
                    })
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
            }
            //this.loadBook
            router.push('/')
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
          point: 100
        }
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
      PostBook ({commit}, payload) {

        var database = firebase.database()
        var userRef = database.ref('BookCard')

        var date = Date(Date.now())
        var date_now = date.toString()
        var date_post = date_now.substring(0,24)
        var image = payload.imagefile

        
        commit('setError', null)
        let minusIndex = this.state.index - 1;
        const data = {
          bookname: payload.bookname,
          description : payload.description,
          imgurl:"",
          index: minusIndex,
          owner: payload.owner,
          writter: payload.writter,
        }
        userRef.child(date_post).set(data)

        const storageRef = firebase.storage().ref(image[0].name);
        const task = storageRef.put(image[0]);
        task.on('state_changed', snapshot => {
          commit('setLoading', true)
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },error => {
          console.log(error.message)
        }, () => {
          task.snapshot.ref.getDownloadURL().then((url) => {
            firebase. database().ref('BookCard').child(date_post).update({"imgurl":url})
            commit('setLoading', false)
          })})
      },

      
  },

  getters:{


  }
})


