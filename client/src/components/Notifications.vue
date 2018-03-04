<template>
  <div
    style="margin: 1.5rem"
  >
    <v-toolbar color="primary" style="border-radius: .25rem;">
      <v-toolbar-title class="white--text">Notifications</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex v-for="card in cards">
            <v-card style="text-align: left; overflow: hidden;">
                <img id="userPic" :src="card.avatar">
                <div id="textStuff">
                    <div id="textHead">
                        <small id="timeStamp">4 min</small>
                        <h4>{{card.username}}</h4>
                    </div>
                    <p style="margin-right: 1.5rem;">{{card.message}}</p>
                    <v-card-actions style="margin: 0; padding: 0;">
                        <v-spacer></v-spacer>
                        <v-badge left color="purple" overlap>
                            <span slot="badge">{{card.messageLike}}</span>
                            <v-btn icon>
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

export default {
  name: "Notifications",
  data() {
    return {
        cards: [
            { avatar: '/static/images/nikola.jpg', username: 'Nikola Tesla', message: 'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', messageLike: 6 },
            { avatar: '/static/images/einstein.jpg', username: 'Einstein', message: 'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', messageLike: 23 },
            { avatar: '/static/images/nikola.jpg', username: 'Nikola Tesla', message: 'Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', messageLike: 19 },
      ]
    };
  },
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