<template>
    <div class="bookList">
        <v-card >
            <v-container>
                <v-layout gow wrap>
                    <v-flex md6> 
                        <BookCard v-for="n in this.$store.state.bookcard"  :key="n.index" :data="n" ></BookCard>
                    </v-flex>
                    
                </v-layout>
            </v-container>
        </v-card>
    </div>
        
</template>

<script>
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