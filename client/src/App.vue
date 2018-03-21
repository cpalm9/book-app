<template>
  <v-app id="inspire">
    <v-toolbar style="background-color: #2660A4" dark fixed app>
      <v-toolbar-title><a href="/#/"><img id="appLogo" src="static/images/logo.png"></a></v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :to="$router.push({name: 'Home'})" v-if="$store.state.token">Home</v-btn>
        <v-btn flat v-if="$store.state.token">Profile</v-btn>
        <v-btn flat v-if="$store.state.token">Settings</v-btn>
        <v-btn flat v-if="$store.state.token" @click="logout">Logout</v-btn>
        <v-btn flat v-else @click="$router.push({name: 'Login'})">Login</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-text-field v-if="$store.state.token" light solo append-icon="search" placeholder="Search books..."></v-text-field>
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
import {AUTH_LOGOUT} from './store'
Vue.use(VueCarousel);

export default {
  name: "App",
  data: () => ({
      drawer: null
    }),
    props: {
      source: String
    },
    methods: {
      logout: function () {
      this.$store.dispatch(AUTH_LOGOUT)
      .then(() => {
        this.$router.push({name: 'Login'})
      })
    }
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
