/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'
// You also need to import the styles. If you're using webpack's css-loader, you can do so here:
import 'vue-snotify/styles/material.css';
import Swal from 'sweetalert2'
import store from '@/store.js'
// eslint-disable-next-line no-unused-vars
import {app} from '@/config'
import { stat } from 'fs';




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
    isborrow:false,
    isSaveDetail: false,
    userPoint: 0,
    isAlreadyMinusPoint: false,
    owner: null,
    bookcard:[],
    index : 0,
  },
 
  mutations: {
    setUser (state, payload) {
      state.email = payload
    },
    setUserPoint(state,payload){
      state.userPoint = payload
    },
    setIsAlreadyMinusPoint(state,payload){
      state.isAlreadyMinusPoint = payload
    },
    getIsAlreadyMinusPoint(state){
      return state.isAlreadyMinusPoint
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
    setBorrow(state,payload){
      state.isborrow = payload
    },
    setNoti(state,payload){
      state.isnoti = payload
    },
    getNoti(state){
      return state.isnoti
    },
    saveDetail(state,payload){
      state.isSaveDetail = payload
    },
    setOwner(state,payload){
      state.owner = payload
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
        bookcard.push({
          id: key,
          bookname: obj[key].bookname,
          description: obj[key].description,
          imgurl: obj[key].imgurl,
          index: obj[key].index,
          owner: obj[key].owner,
          writter: obj[key].writter,
          uid : obj[key].uid
        })
      }
      commit('setIndex', index)
      commit('setLoadedBook',bookcard)
      })

    },
    setBorrow({commit},payload){
      commit('setBorrow',true)
      var date = Date(Date.now())
      var date_now = date.toString()
      // eslint-disable-next-line no-unused-vars
      var date_post = date_now.substring(0,24)
      var userRef = firebase.database().ref("User").child(payload.owner)
      userRef.update({
        "borrownoti":true
      })
      var requesterRef = firebase.database().ref("Requester").child(payload.owner)
      requesterRef.set({
        "requester":payload.swapper,
        "requesto":payload.owner,
        "bookfortrade":payload.bookname,
        "duration":payload.duration
      })
    },
    setNoti({commit},payload){
      commit('setNoti',true)
      var date = Date(Date.now())
      var date_now = date.toString()
      // eslint-disable-next-line no-unused-vars
      var date_post = date_now.substring(0,24)
      var userRef = firebase.database().ref("User").child(payload.owner)
      userRef.update({
        "isnoti":true
      })
      var requesterRef = firebase.database().ref("Requester").child(payload.owner)
      requesterRef.set({
        "requester":payload.swapper,
        "requesto":payload.owner,
        "bookfortrade":payload.bookname
      })
     
      
    },
    saveDetail({commit},payload){
        commit('saveDetail',true)
        var date = Date(Date.now())
        var date_now = date.toString()
        var date_post = date_now.substring(0,24)
        //var user = firebase.auth().currentUser
        //var userid = user.uid
        var userPoint
        var userRef
        var check = commit('getIsAlreadyMinusPoint')
        var pointRef = firebase.database().ref('User').child(payload.swapper)
        console.log("swapper : "+payload.swapper);
        
        pointRef.on("value",function(Snapshot){
          userPoint = Snapshot.val().point
          console.log("before: "+userPoint)
          console.log("ueqweuwueuque"+check);
          
          
          if (check == false){
          userPoint -= 100
          }
          commit('setIsAlreadyMinusPoint',true)
          commit('setUserPoint',userPoint)
          console.log("after: "+userPoint)
          //userRef = firebase.database().ref('User').child(userid)
          pointRef.update({
              "point":userPoint
          })
        })
        
        var detaillRef = firebase.database().ref("TradeDetail").child(date_post)
        detaillRef.set({
          "owner":payload.owner,
          "swapper":payload.swapper,
        })
        if(payload.type == 'borrow'){
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'การยืมสำเร็จ',
            showConfirmButton: false,
            timer: 2000
          })
        }
        else{
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'การแลกเปลี่ยนสำเร็จ',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
        selectBook({commit},payload){
          var user = firebase.auth().currentUser
          var userid = user.uid
          var bookOwner =payload.owner
          //alert(payload.owner)
          commit('setOwner',bookOwner)
          console.log("GOOOO!")
          var getbook
          var childData
          var bookCardRef
          var bookOwnRef = firebase.database().ref('User').child(userid).child("book")
          bookOwnRef.on("value",function(Snapshot){
              Snapshot.forEach(function(childSnapshot){
                  //var key = childSnapshot.key
                  childData= childSnapshot.val()
                  bookCardRef = firebase.database().ref('BookCard').child(childData)
                  bookCardRef.on('value',function(dataSnapshot){
                      getbook = dataSnapshot.val().bookname
                      console.log("picked up book :"+getbook);
                      // eslint-disable-next-line no-unused-vars
                      const {value: book} =  Swal.fire({
                        title: 'เลือกหนังสือของคุณ',
                        input: 'select',
                        inputOptions: {
                          'book1': getbook,
                        },
                        inputPlaceholder: 'อยากแลกด้วยเล่มไหนล่ะ',
                        showCancelButton: true,
                        inputValidator: (value) => {
                          return new Promise((resolve) => {
                            if (value === '') {
                              resolve('กรุณาเลือกหนังสือ :)')
                            } else {
                             
                              Swal.fire('คุณเลือก: ' + getbook)
                              setTimeout(() => {
                              resolve()
                              console.log("owner is "+bookOwner);
                      
                              Vue.$snotify.success('คำขอแลกถูกส่งไปแล้ว');
                              // this.$store.dispatch('setNoti',{swapper:userid,owner:bookOwner})
                              // this.Store.setNoti({swapper:userid,owner:bookOwner})
                              // store.setNoti({swapper:userid,owner:bookOwner})
                              store.dispatch('setNoti',{swapper:userid,owner:bookOwner,bookname:getbook})
                              
                            }, 1500)
                            }
                          })
                        }
                      })
                    
                    
                  })
                   
              })
          })
          
      },
     loadBook({commit}){
      commit('setLoading', true)
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
      router.push('/')
      location.reload();
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
          //psw: payload.password,
          //favoritepost: payload.favoritepost,
          point: 100,
          book:'',
          borrow:'',
          isnoti:false,
          borrownoti:false
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
        var accountRef = firebase.auth().currentUser.uid

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
          uid : firebase.auth().currentUser.uid,
          writter: payload.writter,
        }
        userRef.child(date_post).set(data)
        var bookRef = firebase.database().ref('User').child(accountRef).child("book")
        bookRef.update({
          "book1":date_post
        })

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
     
  }
})


