<template>
    <v-layout row wrap text-xs-center>
      <v-flex xs3>
        <user-component/>
        <current-reading-list/>
      </v-flex>
      <v-flex xs6>
        <notifications/>
      </v-flex>
      <v-flex xs3>
        <group-list/>
        <suggestions/>
      </v-flex>
    </v-layout>
</template>

<script>
import BookService from "@/services/BookService";
import UserComponent from './UserComponent.vue';
import CurrentReadingList from './CurrentReadingList.vue';
import Notifications from './Notifications.vue';
import GroupList from './GroupList.vue';
import Suggestions from './Suggestions.vue';

import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    UserComponent,
    CurrentReadingList,
    Notifications,
    GroupList,
    Suggestions,
    Carousel,
    Slide,

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card{
  margin: 1.5rem;
  border-radius: .25rem;
}

</style>
