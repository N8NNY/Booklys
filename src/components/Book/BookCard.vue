<template>
    <v-card class="ma-2" width="356px">
            <v-card-title>
                <v-avatar size="24">
                    <img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' alt="">
                </v-avatar>
                
                <div><strong v-if="data.owner" >{{data.owner}}
  
                </strong></div>
                
                <v-spacer></v-spacer>
                <v-btn flat icon>
                <v-icon left class='ma-1'>favorite_border</v-icon> 
                </v-btn>
            </v-card-title>

            <v-card-text style="height : 156px;">
                <v-layout row >
                     <v-flex md4 >
                        <v-img
                           v-bind:src=data.imgurl
                            v-bind:lazy-src=data.imgurl
                            aspect-ratio="1"
                            class="grey lighten-2"
                        >
                        <template v-slot:placeholder>
                            <v-layout
                                fill-height
                                align-center
                                justify-center
                                ma-0
                            >
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                        </template>
                         </v-img>
                     </v-flex>

                    <v-flex md8 class="ma-2">
                        <v-layout row wrap>
                            <v-flex md12 class="ma-1">

                                <div class="title" v-if="data.bookname">{{data.bookname}}</div>
                            </v-flex>
                            <v-flex md12 class="mx-1 grey--text">
                                <div class="subheading" v-if="data.writter">{{data.writter}}</div>
                            </v-flex>
                            <v-flex md12 class="ma-1">
                                <div class="caption" v-if="data.description" style="word-wrap: break-word;">{{data.description}}</div>
                            </v-flex>

                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card-text>
            
            <v-card-actions class="justify-space-around">
                <v-btn @click="swapOnclick" flat class="amber accent-3 white--text" v>
                 Swap
                </v-btn>
                <v-btn v-on:click="borrow" flat class="amber accent-3 white--text">
                 Borrow 
                </v-btn>
            </v-card-actions>
            
        </v-card>
</template>

<script>
import firebase from 'firebase'
import 'vue-snotify/styles/material.css';
import Swal from 'sweetalert2'
import Vue from 'vue'
import store from '@/store.js'
export default {
     props: ['data'],
    methods: {
       swapOnclick () {
            this.$store.dispatch('selectBook',{owner:this.data.owner})
            },
            getOwner(){
                //alert(this.data.owner)
                return this.data.owner
            },
        borrow:function(){
            //gwt current user id
                var firebaseUser=firebase.auth().currentUser
            var uid=firebaseUser.uid
            // get user ref
            var userRef=firebase.database().ref("User").child(uid)
            var userData
            //prepare date
            var date = Date(Date.now())
            var date_now = date.toString()
            //create request
            var req={
                book:this.data.id,
                requester:uid,
                owner:this.data.owner,
                duration:7,
                date:date_now,
                status:'pending'
            }
            //push request to transaction
            var transactionRef=firebase.database().ref("Transaction")
            var transactionid=transactionRef.push(req)

            // add request to requester
            userRef.on('value' , function(dataSnapshot) {
                userData= dataSnapshot.val()
            })
            var borrowList=userData.borrow.split(',')
            borrowList.push(transactionid.key)
            var returnStr=''
            var i
            for(i=0;i<borrowList.length-1;i++)
            {
                if(borrowList[i]==''){
                    break
                }
                returnStr=returnStr.concat(borrowList[i])
                returnStr=returnStr.concat(',')
            }
            returnStr=returnStr.concat(borrowList[borrowList.length-1])
            userRef.update({"borrow":returnStr})

            // add request to requester
            var userRef=firebase.database().ref("User").child(this.data.owner)
            userRef.on('value' , function(dataSnapshot) {
                userData= dataSnapshot.val()
            })
            var borrowList=userData.borrow.split(',')
            borrowList.push(transactionid.key)
            var returnStr=''
            var i
            for(i=0;i<borrowList.length-1;i++)
            {
                if(borrowList[i]==''){
                    break
                }
                returnStr=returnStr.concat(borrowList[i])
                returnStr=returnStr.concat(',')

            }
            returnStr=returnStr.concat(borrowList[borrowList.length-1])
            userRef.update({"borrow":returnStr})
            Vue.$snotify.success('คำขอแลกถูกส่งไปแล้ว');
            store.dispatch('setBorrow',{swapper:uid,owner:this.data.owner,bookname:""})
        }
        },
    computed: {
        getDescription : function (){
            return this.data.description
        },
        getowner:function(){
            var firebaseUser=firebase.auth().currentUser
            var uid=firebaseUser.uid
            var userRef=firebase.database().ref("User").child(uid)
            var userData
            userRef.on('value' , function(dataSnapshot) {
                userData= dataSnapshot.val()
            })
            return userData.displayname

        }
    }

}

</script>