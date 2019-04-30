<template>
    <v-card class="ma-2" >
            <v-card-title>
                <v-avatar size="24">
                    <img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' alt="">
                </v-avatar>
                <div><strong v-if=data.owner>{{data.owner}}
  
                </strong></div>
                
                <v-spacer></v-spacer>
                <v-btn flat icon>
                <v-icon left class='ma-1'>favorite_border</v-icon> 
                </v-btn>
            </v-card-title>

            <v-card-text>
                <v-layout row>
                     <v-flex md4>
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
                                <div class="title" v-if=data.bookname>{{data.bookname}}</div>
                            </v-flex>
                            <v-flex md12 class="mx-1 grey--text">
                                <div class="subheading" v-if=data.writter>{{data.writter}}</div>
                            </v-flex>
                            <v-flex md12 class="ma-1">
                                <div class="caption" v-if=data.description>{{data.description}}</div>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                </v-layout>
            </v-card-text>
            
            <v-card-actions class="justify-space-around">
                <v-btn @click="setNoti" flat class="amber accent-3 white--text" v>
                 Swap
                </v-btn>
                <v-btn flat class="amber accent-3 white--text">
                 Borrow 
                </v-btn>
            </v-card-actions>
            
        </v-card>
</template>

<script>
import firebase, { functions } from 'firebase'
import Vue from 'vue'
import store from '@/store.js'
export default {
    
     props: ['data'],
    methods: {
        setNoti () {
            store.dispatch('selectBook')
            },
            getOwner(){
                //alert(this.data.owner)
                return this.data.owner
            }
        }
}


</script>