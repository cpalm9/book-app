<template>
  <!-- <div id="home"> -->
    <!-- <v-jumbotron color="grey lighten-2">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3">{{msg}}</h3>
            <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron> -->
    <!-- <v-data-table :headers="fields" :items="items" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{props.item.title}}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.author }}</td>
        <td class="text-xs-left">{{ props.item.rating }}</td>
        <td class="justify-left layout px-0">
          <v-btn icon class="mx-0" :to="{ name: 'EditBook', params: { id: props.item._id }}">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteBook(props.item._id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table> -->
    <!-- <v-layout align-left>
      <v-btn color="primary" :to="{ name: 'NewBook' }">Add
        <v-icon dark right>check_circle</v-icon>
      </v-btn>
    </v-layout> -->
  <!-- </div> -->

    <v-layout row wrap text-xs-center>
      <v-flex xs3>
        <user-component/>
      </v-flex>
      <v-flex xs6>
        <v-card dark color="primary">
          <v-card-text class="px-0">6</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card dark color="primary">
          <v-card-text class="px-0">3</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  

</template>

<script>
import BookService from "@/services/BookService";
import UserComponent from './UserComponent.vue';

export default {
  name: 'Home',
  data () {
    return {
      // items: [],
      // msg: 'Welcome to the cool Book App',
      // fields: [
      //   { value: 'title', text: 'Title', sortable: false },
      //   { value: 'description', text: 'Description' },
      //   { value: 'author', text: 'Author' },
      //   { value: 'rating', text: 'Rating'},
      //   { value: 'actions', text: 'Actions'}
      // ]
    }
  },
  // mounted() {
  //   this.getBooks();
  // },
  // methods: {
  //   async getBooks() {
  //     const response = await BookService.fetchBooks();
  //     this.items = response.data.books;
  //   },
  //   async deleteBook(id) {
  //     await BookService.deleteBook(id);
  //     this.getBooks();
  //   }
  // },
  components: {
    UserComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
