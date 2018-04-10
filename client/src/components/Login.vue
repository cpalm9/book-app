<template>
   <v-card>
        <v-card-title>
          <span class="headline" style="color: #2660A4;">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Username" v-model="username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required v-model="password"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="login">Login</v-btn>
          <v-btn color="blue darken-1" flat @click="register">Register</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
import {AUTH_REQUEST, AUTH_ERROR} from '../store'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login: function () {
      const { username, password } = this
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then((res) => {
        if(res.data.status !== 200){
          this.$store.dispatch(AUTH_ERROR)
        }
        this.$router.push('/')
      })
    },
    register: function () {
      this.$router.push({name: 'Register'})
    }
  }
}
</script>

<style scoped>

</style>
