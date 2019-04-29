<template>
    <div class="bookList">
        <v-card >
            <v-container>
                <v-layout gow wrap>

                    <v-flex d-flex md6 v-for="n in this.$store.state.bookcard"  :key="n.index"> 
                        <BookCard  :data="n" ></BookCard>
                    </v-flex>
                    
                </v-layout>
            </v-container>
        </v-card>
    </div>
        
</template>

<script>
/* eslint-disable */
import BookCard from '@/components/Book/BookCard.vue'


export default {
    name: 'bookList',
    like:false,
    components: {
    BookCard
  },
   data(){
      BookCard: {}
  },
  mounted(){
      
  },
    created() {
        function check () {
      console.log("bokkkk")
      }
    },
  methods: {
       
  }
}
</script>

