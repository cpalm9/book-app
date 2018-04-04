<template>

    <v-card>
        <v-toolbar style="background-color: #E8AB3C;" dark>
          <v-toolbar-title>Next Book</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title id="bookContent">
            <div>
                <img class="bookPic" :src="thumbnail">
                <h6 class="headline mb-0">{{title}}</h6>
                <div>{{author}}</div>
            </div>
        </v-card-title>
        <div>
            <h5>Start Date: {{startDate}}</h5>
            <book-vote/>
        </div>
    </v-card>

</template>
<script>

import BookVote from './BookVote.vue';

export default {
  name: "NextBookToRead",
  data() {
    return {
        title: 'Insignia',
        thumbnail: 'static/images/insignia.jpeg',
        author: 'S.J. Kincaid',
        startDate: '05/23/18'
    };
  },
  components: {
      BookVote,

  },
};
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

</style>