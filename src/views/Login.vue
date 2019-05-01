<template>
  <v-layout column align-center >
    <v-flex mt-5>
      <div class="display-3 font-weight-bold orange--text text--darken-1">BOOKLYs</div>
    </v-flex>
    <v-flex class="text-md-center" mt-5>
      <h3 class="amber--text text--darken-4">SIGN IN</h3>
    </v-flex>
    <v-flex mt-3>
      <form @submit.prevent="userSignIn">
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
          <v-flex class="text-md-center" mt-5>
            <v-btn primary type="submit" :disabled="loading" color="yellow darken-4" class="white--text">Sign In</v-btn>
            <v-btn :disabled="loading" color="yellow darken-4"><router-link to="/signup" style="text-decoration:none;" class="white--text">Sign Up</router-link></v-btn>
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
      alert: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.getError
    },
    loading () {
      return this.$store.getters.getLoading
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
        this.$store.dispatch('setError', false)
      }
    }
  },
  methods: {
    userSignIn () {
      this.$store.dispatch('userSignIn', {email: this.email, password: this.password})
    },
  }
}
</script>
