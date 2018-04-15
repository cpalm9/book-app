<template>

    <v-card>
        <v-toolbar style="background-color: #E8AB3C;" dark>
          <v-toolbar-title>Next Book</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title id="bookContent">
            <div>
                <img class="bookPic" :src="book.thumbnail">
                <h6 class="headline mb-0">{{book.title}}</h6>
                <div>{{book.author}}</div>
            </div>
        </v-card-title>
        <div>
            <h5>Start Date: </h5>
            <book-vote/>
            <v-btn color="success" @click="startReading(book)">Start Reading</v-btn>
        </div>
    </v-card>

</template>
<script>

import BookVote from './BookVote.vue';
import GroupService from '../services/GroupService'
export default {
  name: "NextBookToRead",
  data() {
    return {
        book: {},
        group: {},

    };
  },
  components: {
      BookVote,
  },
  methods: {
      async getGroup() {
          await GroupService.getGroupById(this.$route.params.id).then(res => {
            this.group = res.data.group
            var temp = 0;
            var book = {};
            if(this.group.booksToRead != null){
                for(var x = 0; x < this.group.booksToRead.length; x++){
                    if(this.group.booksToRead[x].upVote > temp) {
                        book = this.group.booksToRead[x]
                        temp = this.group.booksToRead[x].upVote
                    }
                }
                this.book = book
            }
          })
        },
        addToReadingList(book) {
            var newBook = { 
                title: book.title,
                author: book.author,
                thumbnail: book.small_image_url, 
                };

            var user = this.$store.state.user
            // console.log(newBook)

            this.$store.dispatch(UPDATE_READING_LIST, {book: newBook, user: user}).then((res) => {
                if(res.data.status !==200){
                    this.$store.dispatch("Error")
                }
                // console.log(res)
            })

            //this.$store.state.user.readingList.push(newBook)
        },
        async startReading(){
            await GroupService.startReading({
                book: this.book,
                group: this.group
            }).then(res => {
                this.$root.$emit('updated-current-book', {
                    book: res.data.book
                })
            })
        }
  },
  mounted() {
      this.getGroup()
      this.$root.$on('updated-list', () => {
            this.getGroup()
        })
  }
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