<template>
    <div class="bookList">
        <v-card>
            <v-container>
                <v-layout gow wrap>
                    <v-flex md6>
                        <BookCard/>
                    </v-flex>
                    <v-flex md6>
                        <BookCard/>
                    </v-flex>
                    <v-flex md6>
                        <BookCard/>
                    </v-flex>
                    <v-flex md6>
                        <BookCard/>
                    </v-flex>
                    <v-flex md6>
                        <BookCard/>
                    </v-flex>
                    <v-flex md6>
                        <BookCard/>
                    </v-flex>
                    <v-flex md6>
                        <BookCard/>
                    </v-flex>
                    <v-flex md6>
                        <BookCard/>
                    </v-flex>
                    <v-flex md6>
                        <BookCard/>
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
    components: {
    BookCard
  }
}
</script>

