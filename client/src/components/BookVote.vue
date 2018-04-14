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

        <v-layout row wrap text-xs-center>
        
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
                <v-card id="searchCard">
                    <v-text-field id="searchBar" v-model="search" @keyup="doSearch" light solo append-icon="search" placeholder="Search books..."></v-text-field>
                    <!-- <input v-model="search" type="search"> -->
                    <!-- <input type="button" @click="doSearch" value="Search"> -->
                    <br clear="left">
                    <div v-if="searching"><i>Searching...</i></div>

                    <div class="allResults">
                        <div v-if="books.length" >
                        <h2>Results</h2>
                        <p><i>Click the cover to find similar books...</i></p>
                        <div v-for="book in books" class="bookResult" :key="book.title">
                            <img :src="book.image_url" class="bookResult" @click="findSimilar(book); addToReadingList(book);" >
                            {{book.title}}
                        </div>
                    </div>

                    <div v-if="relatedBooks.length">
                        <h2>Books Related to {{ selectedBook.title }}</h2>
                        <div v-for="book in relatedBooks" class="bookResult" :key="book.title">
                            <img :src="book.image_url" class="bookResult" @click="findSimilar(book)">
                            {{book.title}}
                        </div>
                        </div>

                    </div>
                </v-card>
            </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {UPDATE_READING_LIST} from '../store'
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
        valueDeterminate: 50,
        search:'',
        books:[],
        relatedBooks:[],
        searching:false,
        selectedBook:null,
      }
    },
    methods:{
        doSearch() {
            if(this.search === '') return;
            this.searching = true;
            this.books = [];
            this.relatedBooks = [];
            fetch(`https://openwhisk.ng.bluemix.net/api/v1/web/rcamden%40us.ibm.com_My%20Space/goodreads/search.json?search=${encodeURIComponent(this.search)}`)
            .then(res=>res.json())
            .then(res => {
                this.searching = false;
                this.books = res.result;
            });
        },
        findSimilar(book) {
            this.selectedBook = book;
            // console.log(book);
            this.relatedBooks = [];
            fetch(`https://openwhisk.ng.bluemix.net/api/v1/web/rcamden%40us.ibm.com_My%20Space/goodreads/findSimilar.json?id=${encodeURIComponent(book.id)}`)
            .then(res=>res.json())
            .then(res => {
                this.relatedBooks = res.result;
            });
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

    #searchCard{
        margin-right: 25%;
        margin-top: 20%;
        width: 540px;
        background: rgba(0, 25, 25, .2);
    }

    div.bookResult {
    clear: left;
    }

    img.bookResult {
    float: left;
    margin-right: 5px;
    margin-bottom: 10px;
    cursor:pointer;
    }

    .allResults {
    display: grid;
    grid-template-columns: 50.0% 50.0%;   
    }

</style>