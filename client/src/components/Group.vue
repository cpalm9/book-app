<template>
  <v-layout row wrap text-xs-center>
    <v-flex xs12>
        <div style="margin-bottom: 1.5rem;">
            <h1>Hello {{ this.$route.params.id }}</h1>
        </div>
    </v-flex>
    <v-flex xs3 style="margin-left: 176px;" >
        <group-current-reading/>
    </v-flex>
    <v-flex xs6>
        <group-notifications/>
    </v-flex>
    </v-layout>
</template>



<script>

    import GroupCurrentReading from './GroupCurrentReading.vue';
    import GroupNotifications from './GroupNotifications.vue';

    export default {
    name: 'Group',
    data () {
    return {
    }
  },
  components: {
      GroupCurrentReading,
      GroupNotifications,

  }
}
</script>

<style scoped>

</style>