<template>
  <v-app id="inspire">
    <v-toolbar style="background-color: #2660A4" dark fixed app>
      <v-toolbar-title><a href="/#/"><img id="appLogo" src="static/images/logo.png"></a></v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="$router.push({name: 'Home'})">Home</v-btn>
        <!-- <v-btn flat>Profile</v-btn> -->
        <v-btn flat>Settings</v-btn>
        <!-- <login-dialog/> -->
        <v-menu offset-y>
          <v-btn flat dark slot="activator">Account</v-btn>
          <v-list>
            <v-list-tile @click="">
              <v-list-tile-title>Signup</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-text-field light solo append-icon="search" placeholder="Search books..."></v-text-field>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer style="background-color: #2660A4" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- <router-view/> -->
  </v-app>
</template>

<script>
import Vue from 'vue';
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import LoginDialog from './components/LoginDialog.vue';

export default {
  name: "App",
  data: () => ({
      drawer: null
    }),
    props: {
      source: String
    },
    components: {
      LoginDialog,
    }

};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

#appLogo{
  height: 50px;
  margin-top: 5px;
}

</style>
