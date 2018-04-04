<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-btn color="primary" dark slot="activator">Vote for Next Book</v-btn>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Next Book</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        
        <v-flex xs6>
            <v-card id="voteCard">
                <v-card-title primary-title id="bookContent">
                    <div style="text-align: center;">
                        <img class="bookPic" :src="thumbnail">
                        <h6 class="headline mb-0">{{title}}</h6>
                        <div>{{author}}</div>
                    </div>
                </v-card-title>

                <div class="text-xs-center">
                    <v-btn id="upBtn" flat icon color="blue lighten-2">
                        <v-icon x-large>thumb_up</v-icon>
                    </v-btn>

                    <v-btn id="downBtn" flat icon color="red lighten-2">
                        <v-icon x-large>thumb_down</v-icon>
                    </v-btn>
                </div>

            </v-card>
        </v-flex>

        <v-flex xs6>

        </v-flex>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        title: 'Harry Potter',
        thumbnail: 'static/images/HarryPotter.jpg',
        author: 'J.K. Rowling',
        valueDeterminate: 50
      }
    }
  }
</script>

<style scoped>
    .bookPic{
        max-height: 200px;
        border: 3px solid #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        position: relative;
    }

    #bookContent{
        justify-content: center;
    }

    #voteCard{
        margin-left: 33%;
        margin-top: 20%;
        max-width: 300px;
        background: rgba(0, 25, 25, .2);
    }

    #upBtn{
        margin-right: 30px;
    }

    #downBtn{
        margin-left: 30px;
    }

</style>