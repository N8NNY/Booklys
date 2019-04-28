<template>
    <v-card class="ma-2">
            <v-card-title>
                <v-avatar size="24">
                    <img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' alt="">
                </v-avatar>
                <strong>{{this.$store.book.owner}}</strong>
                <v-spacer></v-spacer>
                <v-btn flat icon>
                <v-icon left class='ma-1'>favorite_border</v-icon> 
                </v-btn>
            </v-card-title>

            <v-card-text>
                <v-layout row>
                     <v-flex md4>
                        <v-img
                            src='http://www-fp.pearsonhighered.com/assets/hip/images/bigcovers/1292096136.jpg'
                            lazy-src='http://www-fp.pearsonhighered.com/assets/hip/images/bigcovers/1292096136.jpg'
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
                                <div class="title">Software Engineering, Global Edition, 10/E</div>
                            </v-flex>
                            <v-flex md12 class="mx-1 grey--text">
                                <div class="subheading">Ian Sommerville</div>
                            </v-flex>
                            <v-flex md12 class="ma-1">
                                <div class="caption">The Fundamental Practice of Software Engineering

Software Engineering introduces students to the overwhelmingly important subject of software programming and development. In the past few years, computer systems have come to dominate not just our technological growth, but the foundations of our world’s major industries. This text seeks to lay out the fundamental concepts of this huge and continually growing subject area in a clear and comprehensive manner.</div>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                </v-layout>
            </v-card-text>
            
            <v-card-actions class="justify-space-around">
                <v-btn flat class="amber accent-3 white--text">
                 Swap
                </v-btn>
                <v-btn flat class="amber accent-3 white--text">
                 Borrow 
                </v-btn>
            </v-card-actions>
            
        </v-card>
</template>

<script>
export default {
}
</script>