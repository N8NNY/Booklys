<template>
  <v-layout column>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h3>Sign Up</h3>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <form @submit.prevent="userSignUp">
        <v-layout column>
          <v-flex>
            <v-alert error dismissible v-model="alert">
              {{ error }}
            </v-alert>
          </v-flex>
          <v-flex>
            <v-text-field
              name="email"
              label="Email"
              id="email"
              type="email"
              v-model="email"
              
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="password"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              v-model="passwordConfirm"
              :rules="[comparePasswords]"
            ></v-text-field>
          </v-flex>
          <v-flex class="text-xs-center" mt-5>
            <v-btn primary type="submit" :disabled="loading">Sign Up</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        passwordConfirm: '',
        alert: false
      }
    },
    computed: {
      comparePasswords () {
        return this.password === this.passwordConfirm ? true : 'Password and confirm password don\'t match'
      },
      error () {
        return this.$store.getters.getError
      },
      loading () {
        return this.$store.getters.getLoading
      }
      /*checkEmailFormat(){
        var email=this.email
        //var dname=document.getElementById('dname').value;
        var psw=this.password
        var cpsw = this.password

        var isEmailOk =false;
        var isDnameOk =false;
        var isPswOk = false;
        var isCpswOk = false;

    
        var mailre = '^[0-9]{8}@kmitl.[a-z]{2}.[a-z]{2}$';
        if(email.match(mailre)){
            console.log("email Ok");
            isEmailOk = true;
        }
        
        else if(!email.match(mailre)){
            alert("โปรดใช้อีเมลสถาบัน");
        }
        if(psw.length==0){
            alert("โปรดใส่รหัสผ่าน");
        }
        else if(psw.length >0){
            console.log("password Ok");
            isPswOk = true;
        }
        if(cpsw.length==0){
            alert("โปรดยืนยันรหัสผ่าน");
        }

        if(psw != cpsw){
            alert("โปรดใส่รหัสผ่านให้ตรงกัน");
        }
        else if(psw == cpsw){
            console.log("password match");
            isCpswOk = true;
        }
        if((isEmailOk&&isDnameOk)&&(isPswOk&&isCpswOk)){
            insertData(email,dname,psw);
        } 
        if(isEmailOk &&(isPswOk&&isCpswOk)){
            return true
        }
        else {
            return false
        }
      }*/
    },
    methods: {
      userSignUp () {
        if (this.comparePasswords !== true) {
          return
        }
        this.$store.dispatch('userSignUp', { email: this.email, password: this.password })
      }
    },
    watch: {
      error (value) {
        if (value) {
          this.alert = true
        }
      },
      alert (value) {
        if (!value) {
          this.$store.dispatch('setError', null)
        }
      }
    }
  }
</script>