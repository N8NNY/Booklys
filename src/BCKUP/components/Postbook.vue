<template>
        <v-card class="amber lighten-3" id="post">
        <v-layout justify-center>
                <v-flex md11>
                    <v-text-field
                    label="Share Books"
                    box
                    class="mt-4"
                    v-model="text">   

                    </v-text-field>
                    <v-btn class="mt-1" @click="add">add</v-btn>
                </v-flex>
            </v-layout>  
        </v-card>
</template>

<script>
import firebase from 'firebase'
export default {
    data(){
        return{
            text:'',
            val:null
            
        }
    },
    methods:{
        add:function(){
            var user = firebase.auth().currentUser
            var UserRef = firebase.database().ref("User").child(user.uid);
            
            var BookRef = firebase.database().ref("BookCard").push({
                 name:'Bookn',
                 author:'john',
                 owner:user.uid
             })
             alert(BookRef.key)

             UserRef.on('value' , function(dataSnapshot) {
                dataSnapshot=dataSnapshot.toJSON()
                var ubook=dataSnapshot
                var d=JSON.parse(dataSnapshot.book)
                console.log(dataSnapshot)
                

            })
             
        }
    }
}
</script>
<style scoped>

</style>
