<template>

    <v-card id="currentCard">
        <v-toolbar style="background-color: #E8AB3C;" dark>
          <v-toolbar-title>Currently Reading</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title id="bookContent">
            <div>
                <img class="bookPic" :src="thumbnail">
                <h6 class="headline mb-0">{{title}}</h6>
                <div>{{author}}</div>
            </div>
        </v-card-title>
    </v-card>

</template>
<script>
import GroupService from '../services/GroupService'
export default {
  name: "GroupCurrentReading",
  data() {
    return {
        title: '',
        thumbnail: '',
        author: '',
    };
  },
  methods: {
    async getGroup() {
        await GroupService.getGroupById(this.$route.params.id).then(res => {
            var group = res.data.group
            var currentBook = group.currentBook
            this.title = currentBook.title
            this.thumbnail = currentBook.thumbnail
            this.author = currentBook.author
        })
    },
  },
  mounted() {
      this.getGroup()
      this.$root.$on('updated-current-book', (payload)=>{
          this.title = payload.book.title
          this.thumbnail = payload.book.thumbnail
          this.author = payload.book.author
      })
  }
};
</script>

<style scoped>
    .bookPic{
        height: 200px;
        border: 3px solid #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        position: relative;
    }

    #bookContent{
        justify-content: center;
    }

    #progressBar{
        text-align: left;
        max-width: 300px;
        margin: 2rem;
        padding-bottom: 25px;
    }

    #currentCard{
        margin-bottom: 2rem;
    }

</style>