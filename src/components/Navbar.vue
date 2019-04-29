<template>
    <div class='navbar' >
        <v-container >
            <v-toolbar app flat  fixed color="orange lighten-2"  class='mb-2'>
            <v-btn flat class="body-2" color="red accent-4">
                <v-icon left class='ma-1'>home</v-icon> Home
            </v-btn>
            <v-btn @click="showNotification" flat class="body-2" color="#f2f4f7">
                <v-icon left class='ma-1' >notifications</v-icon> Notification
            </v-btn>
            <v-btn flat class="body-2" color="#f2f4f7">
                <v-icon left class='ma-1'>favorite</v-icon> Favourite
            </v-btn>
            <v-spacer></v-spacer>       
            <v-text-field
                append-icon="search"
                flat
                hide-details
                solo-inverted
                style="max-width: 300px;"
            />
            <v-btn 
            round depressed 
            color="red accent-3" 
            class="title white--text"
            >
            Share
            </v-btn>
            </v-toolbar>
        </v-container>
        
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
   
    methods: {
    showNotification() {
    var user = firebase.auth().currentUser
      var userRef = firebase.database().ref("User").child(user.uid)
      userRef.update({
        "isnoti":false
      })
      this.$snotify.confirm('Example body content', 'Example title', {
        timeout: 30000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        buttons: [
            {text: 'Yes', action: (toast) => {console.log('Clicked: Yes'), this.$snotify.remove(toast.id);}, bold: false},
            {text: 'No', action: (toast) => {console.log('Clicked: No'), this.$snotify.remove(toast.id);},bold: false},
            //{text: 'Later', action: (toast) => {console.log('Clicked: Later'); this.$snotify.remove(toast.id); } },
            {text: 'Close', action: (toast) => {console.log('Clicked: No'), this.$snotify.remove(toast.id);}, bold: true},
        ]
        });
            
    }
  }
}
</script>

<style>
</style>