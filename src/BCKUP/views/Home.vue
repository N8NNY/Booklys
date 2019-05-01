<template>
  <div class="home">
    
    <Navbar/>
    <v-container>
      <v-layout row>

        <v-flex md3 class="ma-2">
          <ProfileCard/>
        </v-flex>

        <v-flex md9 class="ma-2">
          <v-layout row wrap>
            <v-flex md12>
            <Postbook/>
            </v-flex>

            <v-flex md12>
            <Booklist/>
            </v-flex>
          </v-layout>       
        </v-flex>

      </v-layout>
    </v-container>
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import Postbook from '@/components/Postbook.vue'
import Booklist from '@/components/Book/Booklist.vue'

export default {
  name: 'home',
  components: {
    Navbar,ProfileCard,Booklist,Postbook
  }
}
</script>
