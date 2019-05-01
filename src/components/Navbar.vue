<template>
    <div class='navbar' >
        <v-container >
            <v-toolbar app flat  fixed color="orange lighten-2"  class='mb-2'>
            <v-btn flat class="body-2" color="red accent-4">
                <v-icon left class='ma-1'>home</v-icon> Home
            </v-btn>
            <v-btn @click="showNotification" flat class="body-2" color="#f2f4f7">
                <v-icon left class='ma-1' >notifications</v-icon> Notification
            </v-btn>
            <v-btn flat class="body-2" color="#f2f4f7">
                <v-icon left class='ma-1'>favorite</v-icon> Favourite
            </v-btn>
            <v-spacer></v-spacer>       
            <v-text-field
                append-icon="search"
                flat
                hide-details
                solo-inverted
                style="max-width: 300px;"
            />
            <v-btn 
            round depressed 
            color="red accent-3" 
            class="title white--text"
            >
            Share
            </v-btn>
            </v-toolbar>
        </v-container>
        
    </div>
</template>

<script>
import firebase from 'firebase'
import Vue from 'vue'
import store from '@/store.js'
export default {
    props: ['data'],
   data() {
        return {
        owner:'',
        swapper:''
      }
    },
    methods: {
    showNotification() {
    var user = firebase.auth().currentUser
    var userid = user.uid
    var notistatus
    var requester
    var requesterRef = firebase.database().ref("Requester").child(userid)
    var nameOfRequesterRef
    var nameOfRequester
    var bookForTradeRef
    requesterRef.on('value',function(dataSnapshot){
            requester = dataSnapshot.val().requester
            bookForTradeRef = dataSnapshot.val().bookfortrade
            nameOfRequesterRef = firebase.database().ref("User").child(requester)
            nameOfRequesterRef.on('value',function(dataSnapshot){
            nameOfRequester = dataSnapshot.val().displayname
            var userRef = firebase.database().ref("User").child(user.uid)
            userRef.on('value' , function(dataSnapshot) {
            notistatus = dataSnapshot.val().isnoti

          if (notistatus == true){
              
             Vue.$snotify.confirm('แลกด้วย '+bookForTradeRef, "ผู้ใช้ "+nameOfRequester+" อยากแลกหนังสือกับคุณ", {
                timeout: 30000,
                showProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                titleMaxLength:50,
                oneAtTime:true,
                preventDuplicates: true,
                buttons: [
                    {text: 'Yes', action: (toast) => {store.dispatch('saveDetail',{owner:userid,swapper:requester}),Vue.$snotify.remove(toast.id);}, bold: true},
                    {text: 'No', action: (toast) => {console.log('Clicked: No'),Vue.$snotify.remove(toast.id);},bold: true},
                    {text: 'Close', action: (toast) => {console.log('Clicked: No'), Vue.$snotify.remove(toast.id);}, bold: true},
                ]
                });
                userRef.update({
                    "isnoti":false
                })
            
          }
        //     else{
                
        //       alert('ไม่มีการแจ้งเตือน')
              
        //   }
          
          });
            
        })
    })
    }
   
      
  }
}
</script>

<style>
</style>