<template>
  <v-layout row wrap text-xs-center>
    <v-flex xs12>
        <div style="margin-bottom: 1.5rem;">
            <h1>Welcome {{ this.$route.params.name }}</h1>
        </div>
    </v-flex>
    <v-flex xs3 style="margin-left: 13%;" >
        <group-current-reading/>
        <next-book-to-read/>
    </v-flex>
    <v-flex xs6>
        <group-notifications/>
    </v-flex>
    </v-layout>
</template>



<script>

    import GroupCurrentReading from './GroupCurrentReading.vue';
    import GroupNotifications from './GroupNotifications.vue';
    import NextBookToRead from './NextBookToRead.vue';

    export default {
    name: 'Group',
    data () {
    return {
    }
  },
  components: {
      GroupCurrentReading,
      GroupNotifications,
      NextBookToRead,

  }
}
</script>

<style scoped>

</style>