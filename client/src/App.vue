<template>
  <v-app id="inspire">
    <v-toolbar style="background-color: #2660A4" dark fixed app>
      <v-toolbar-title><a href="/#/"><img id="appLogo" src="static/images/logo.png"></a></v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat href="/#/">Home</v-btn>
        <v-btn flat>Profile</v-btn>
        <v-btn flat>Settings</v-btn>
        <v-btn flat @click="dialog = true">Login</v-btn>
        <Login :loginDialog="dialog"></Login>
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
import Login from './components/Login.vue'
Vue.use(VueCarousel);

export default {
  name: "App",
  data: () => ({
      drawer: null,
      dialog: false
    }),
    props: {
      source: String,
    },
  components: {
    Login
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
