<template>
    <div class="proflie-card">
        <v-card>
                    <v-card-title class="border amber lighten-2">
                        <v-avatar size="36">
                            <img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light' alt="">
                        </v-avatar>
                        <strong>Nonny</strong>
                    </v-card-title>

                    <v-card-text>
                        <v-layout align-center justify-space-between row wrap>

                            <v-flex md4 class="text-md-center" >
                                <div class="body-1 grey--text">Share</div>
                                <div class="title">30</div>
                            </v-flex>
                            <v-flex md4 class="text-md-center" >
                                <div class="body-1 grey--text">Swap</div>
                                <div class="title">2</div>
                            </v-flex>
                            <v-flex md4 class="text-md-center">
                                <div class="body-1 grey--text">Favourite</div>
                                <div class="title">5</div>
                            </v-flex>
                        </v-layout>

                        <v-layout align-center justify-start md5 class="mt-4 justify-center">
                            <v-flex md3 class="title">
                                <v-icon color="amber lighten-1" class="ma-0">mdi-alpha-p-circle-outline</v-icon>
                                15
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