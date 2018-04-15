<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false">
      <v-btn id="voteBtn" color="primary" dark slot="activator">Vote for Next Book</v-btn>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click="dialog = false; updateList" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Help Choose the Next Book to Read</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-container grid-list-md text-xs-center>
        <v-layout row wrap text-xs-center>
            <v-flex xs12>
              <v-alert type="success" dismissible v-model="successDialog">
                Your book has been added to the voting list!
              </v-alert>
            </v-flex>
            <v-flex xs5>
                <v-card id="voteCard">
                    <v-toolbar style="background-color: #E8AB3C; display: flex; justify-content: center" dark>
                        <v-toolbar-title>Vote for the Next Book</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-title primary-title id="bookContent">
                        <div style="text-align: center;" v-if="highestBook">
                            <img class="bookPic" :src="highestBook.thumbnail">
                            <h6 class="headline mb-0">{{highestBook.title}}</h6>
                            <div>{{highestBook.author}}</div>
                        </div>
                    </v-card-title>

                    <div class="text-xs-center">
                        <v-btn id="upBtn" flat icon color="blue lighten-2" @click="incrementVote(yes)">
                            <v-icon x-large>thumb_up</v-icon>
                        </v-btn>

                        <v-btn id="downBtn" flat icon color="red lighten-2" @click="incrementVote(no)">
                            <v-icon x-large>thumb_down</v-icon>
                        </v-btn>
                    </div>

                </v-card>
            </v-flex>

            <v-flex xs2>
                <div id="centerOr">
                    <h1>Or</h1>
                    <p>Add a book to the voting list.</p>
                </div>
            </v-flex>

            <v-flex xs5>
                <v-card id="searchCard">
                    <v-text-field id="searchBar" v-model="search" @keyup="doSearch" light solo append-icon="search" placeholder="Search books..."></v-text-field>
                    <!-- <input v-model="search" type="search"> -->
                    <!-- <input type="button" @click="doSearch" value="Search"> -->
                    <br clear="left">
                    <div v-if="searching"><i>Searching...</i></div>

                    <div class="allResults">
                        <div v-if="books.length" >
                            <!-- <h2>Results</h2> -->
                            <!-- <p><i>Click the cover to find similar books...</i></p> -->
                            <v-list two-line scrollable-menu>
                                <template v-for="book in books" >
                                    <v-divider></v-divider>
                                    <v-list-tile avatar :key="book.title">
                                        <v-list-tile-avatar>
                                        <img :src="book.image_url">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="book.title"></v-list-tile-title>
                                            <v-list-tile-sub-title v-html="book.author"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        <v-btn color="success" @click="addToVoteList(book)"><v-icon dark>add</v-icon></v-btn>
                                    </v-list-tile>
                                </template>
                            </v-list>
                            <!-- <div v-for="book in books" class="bookResult" :key="book.id"> -->
                                <!-- <img :src="book.image_url" class="bookResult"> @click="findSimilar(book);" > -->
                                <!-- {{book.title}} -->
                                <!-- <v-btn color="success" @click="addToVoteList(book)">Add to Vote List</v-btn> -->
                            <!-- </div> -->
                        </div>

                        <!-- <div v-if="relatedBooks.length">
                            <h2>Books Related to {{ selectedBook.title }}</h2>
                            <div v-for="book in relatedBooks" class="bookResult" :key="book.id">
                                <img :src="book.image_url" class="bookResult" @click="findSimilar(book)">
                                {{book.title}}
                                <v-btn color="success">Add to Vote List</v-btn>
                            </div>
                        </div> -->
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {UPDATE_READING_LIST} from '../store'
import GroupService from '../services/GroupService'
  export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        highestBook: '',
        counter: 0,
        valueDeterminate: 50,
        search:'',
        books:[],
        relatedBooks:[],
        searching:false,
        selectedBook:null,
        group: {},
        successDialog: false,
        yes: 1,
        no: 0
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
        async addToVoteList(book) {
            console.log(book)
          var newBook = { 
                title: book.title,
                author: book.author,
                thumbnail: book.image_url, 
          };
          await GroupService.addToVoteList({
            book: newBook,
            group: this.$route.params.id
          }).then(res => {
            if(res.status == 200){
              this.successDialog = true
              //Closes the alert after 4 seconds
              setTimeout(() => {
                this.successDialog = false;
            }, 4000);
              this.getGroup()
            }
          })
        },
        addToList: function (book){
          this.addToVoteList(book)
        },
        async getGroup() {
          await GroupService.getGroupById(this.$route.params.id).then(res => {
            this.group = res.data.group
            if(this.group.booksToRead != null){
              var highBook = this.group.booksToRead
            }
           this.highestBook = highBook[this.counter]
          })
        },
        incrementCounter(){
          var len = (this.group.booksToRead.length - 1)
          if(this.counter < len){
            this.counter += 1
          }
          else {
            this.counter = 0
          }
        },
        async incrementUpVote(val){
          var book = this.highestBook
          await GroupService.changeVote({
            id: val,
            group: this.group,
            book: book
          }).then(res => {
            if(res.status == 200){
              this.incrementCounter()
              this.getGroup()
              this.$root.$emit('updated-list')
              this.search = ''
            }
          })
        },
        async incrementDownVote(val){
          var book = this.highestBook
          await GroupService.changeVote({
            id: val,
            group: this.group,
            book: book
          }).then(res => {
            if(res.status == 200){
              this.incrementCounter()
              this.getGroup()
              this.$root.$emit('updated-list')
              this.search = ''
            }
          })
        },
        incrementVote(value){
          if(value == 1) {
            this.incrementUpVote(1)
          }
          else {
            this.incrementDownVote(0)
          }
        },

    },
    mounted() {
      this.getGroup()
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
        margin-left: 20%;
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
        margin-right: 20%;
        margin-top: 20%;
        width: auto;
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
    overflow:auto;
    max-height: 400px;
    }

    #centerOr{
        margin-top: 230px;
        margin-left: -80px;
    }
    /* #voteBtn{
        width: 100px;
    } */

</style>