<template>
    <div class="bookList">
        <v-card>
            <v-container>
                <v-layout gow wrap>
                    <v-flex md6 v-for="bookList in bookLists" :key="bookList.id " >
                        <BookCard v-bind:book="bookList"/>
                    </v-flex>

                </v-layout>
            </v-container>
        </v-card>
    </div>
        
</template>

<script>
/* eslint-disable */
import BookCard from '@/components/Book/BookCard.vue'
import firebase from 'firebase'
import {app} from '@/config'

    var db = app.database();
    var refBooks = db.ref('BookCard');   

export default {
    name: 'bookList',
    components: {
    BookCard
    },
  data() {
        return {
            bookLists: [
                {
                    'id' : 1,
                    'bookname' : "SE dev",
                    'description' : "The Fundamental Practice of Software Engineering  Software Engineering introduces students to the overwhelmingly important subject of software programming and development. In the past few years, computer systems have come to dominate not just our technological growth, but the foundations of our world’s major industries. This text seeks to lay out the fundamental concepts of this huge and continually growing subject area in a clear and comprehensive manner.",
                    'imgurl' : "https://firebasestorage.googleapis.com/v0/b/softdevdb-d19a4.appspot.com/o/1543556630014.jpg?alt=media&token=034c115c-9f2e-4cee-9c33-b44e6bd35567",
                    'owner' : "namkhang",
                    'writter' : "thana"
                },
                {
                    'id' : 2,
                    'bookname' : "comporg",
                    'description' : "Hardest subject of mylife",
                    'imgurl' : "https://firebasestorage.googleapis.com/v0/b/softdevdb-d19a4.appspot.com/o/1543556630014.jpg?alt=media&token=034c115c-9f2e-4cee-9c33-b44e6bd35567",
                    'owner' : "Nonny",
                    'writter' : "Prayute"
                }
            ]
        }
    },
    computed: {
   
    },
    methods: {

    }

}

</script>

