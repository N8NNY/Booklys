<template>
    <div class="proflie-card">
        <v-card>
                    <v-card-title class="border">
                        <v-avatar size="36">
                            <img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' alt="">
                        </v-avatar>
                        <strong>Nonny</strong>
                    </v-card-title>

                    <v-card-text>
                        <v-layout align-center justify-space-between row>
                            <v-flex class="text-md-center" >
                                <div class="body-1 grey--text">Share</div>
                                <div class="title">30</div>
                            </v-flex>
                            <v-flex class="text-md-center" >
                                <div class="body-1 grey--text">Swap</div>
                                <div class="title">2</div>
                            </v-flex>
                            <v-flex class="text-md-center">
                                <div class="body-1 grey--text">Favourite</div>
                                <div class="title">5</div>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    
                    <v-card-actions class="justify-center">
                        <v-btn flat class="red lighten-1 white--text">
                        <v-icon left class='ma-1'>chevron_right</v-icon> Logout
                        </v-btn>
                    </v-card-actions>
                    
                </v-card>
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .border {
        border-bottom: 1px solid #dbdddd;
    }
</style>