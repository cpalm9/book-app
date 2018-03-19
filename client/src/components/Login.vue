<template>
  <v-dialog v-model="loginDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline" style="color: #2660A4;">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Username" v-model="form.username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" v-model="form.password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="loginDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="onSubmit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import LoginService from '../services/LoginService';
export default {
  data () {
      return {
          form: {
              username: '',
              password: ''
          },
      }
  },
  methods: {
      onSubmit (evt) {
        evt.preventDefault();
        LoginService.login(this.form).then(res => {
            this.form = res.data;
            sessionStorage.setItem('token',res.data.token);
            console.log(res.data.token)
            this.$router.push({name: 'Books'})
            this.loginDialog = false;
        }).catch(e =>{
            console.log(e);
        })
        }
    },
    props: {
        loginDialog: false
    }
}
</script>
<style>

</style>
