<template>
  <div
    style="margin-left: 1.5rem"
  >
    <v-toolbar style="border-radius: .25rem; background-color: #E8AB3C;">
      <v-toolbar-title class="white--text">Notifications</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
      <add-comment-dialog/>
      </div>
    </v-toolbar>
    <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex v-for="card in cards" :key="card.id">
            <v-card style="text-align: left; overflow: hidden;" >
                <img id="userPic" src="/static/images/einstein.jpg">
                <div id="textStuff">
                    <div id="textHead">
                        <small id="timeStamp">{{card.datePosted}}</small>
                        <h4>{{card.user}}</h4>
                    </div>
                    <p style="margin-right: 1.5rem;">{{card.comment}}</p>
                    <v-card-actions style="margin: 0; padding: 0;">
                        <v-spacer></v-spacer>
                        <v-badge left color="red" overlap>
                            <span slot="badge">{{card.messageLikes}}</span>
                            <v-btn icon @click="card.messageLikes += 1">
                                <v-icon>favorite</v-icon>
                            </v-btn>
                        </v-badge>
                        <v-btn icon>
                            <v-icon>share</v-icon>
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>

import AddCommentDialog from './AddCommentDialog.vue';
import NotificationService from '../services/NotificationService'
export default {
  name: "Notifications",
  data() {
    return {
        cards: []
    }
  },
  components: {
      AddCommentDialog,
  },
  methods: {
      async getNotifications() {
        var res = await NotificationService.getNotifications()
        var notifications = res.data.notifications
        notifications.forEach(el => {
            var date = new Date(el.datePosted)
            var currentDate = new Date(Date.now())
            var diff = Math.abs(currentDate - date)
            var minutes = date.getMinutes()
            var hours = date.getHours()
            el.datePosted = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getFullYear() + ' ' + hours + ':' + minutes
        });

        var groupNotifications = notifications.filter((x)=> {
          return x.group[0] === this.$route.params.id
        })
        this.cards = groupNotifications
      }
  },
  mounted() {
      this.getNotifications()
      this.$root.$on('notification-added', ()=>{
          this.getNotifications()
      })
      this.$root.$on('updateGroups', ()=> {
          console.log('hits this')
          this.getNotifications()
      })
  }
};
</script>

<style scoped>
    #userPic{
        height: 50px;
        width: 50px;
        border-radius: 100%;
        margin-left: 2rem;
        margin-top: 1.5rem;
    }
    #textStuff{
        width: 80%;
        margin-top: 1.5rem;
        float: right;
        position: relative;
    }
    #timeStamp{
        color: #6c757d !important;
        float: right !important;
        margin-right: 1.5rem;
    }

    .card{
        border-radius: .25rem;
    }

</style>