<template>
   <v-card>
     <v-btn color="blue darken-1" flat @click="$router.go(-1)">
        <v-icon dark left>arrow_back</v-icon>Back
      </v-btn>
        <v-card-title>
          <span class="headline" style="color: #2660A4;">Register</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Name" v-model="name" required></v-text-field>
              </v-flex>
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
          <v-btn color="blue darken-1" flat @click.native="register">Register</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
import {AUTH_REQUEST, AUTH_ERROR, AUTH_REGISTER} from '../store'
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      name: ''
    }
  },
  methods: {
    register: function () {
      const { username, password, name } = this
      this.$store.dispatch(AUTH_REGISTER, { username, password, name }).then((res) => {
        if(res.data.status !== 200){
          this.$store.dispatch(AUTH_ERROR)
        }
        this.$router.push('/auth')
      })
    }
  }
}
</script>

<style scoped>
</style>