<template>
  <div>
    <h1>{{ msg }}</h1>
    <v-data-table :headers="fields" :items="items" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{props.item.title}}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.author }}</td>
        <td class="text-xs-left">{{ props.item.rating }}</td>
        <td class="justify-left layout px-0">
          <v-btn icon class="mx-0" :to="{ name: 'EditBook', params: { id: props.item._id }}">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-btn :to="{ name: 'NewBook' }" dark>Add
      <v-icon dark right>check_circle</v-icon>
    </v-btn>
  </div>
</template>

<script>
import BookService from "@/services/BookService";
export default {
  name: 'Home',
  data () {
    return {
      items: [],
      msg: 'Welcome to the cool Book App',
      fields: [
        { value: 'title', text: 'Title', sortable: false },
        { value: 'description', text: 'Description' },
        { value: 'author', text: 'Author' },
        { value: 'rating', text: 'Rating'},
        { value: 'actions', text: 'Actions'}
      ]
    }
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    async getBooks() {
      const response = await BookService.fetchBooks();
      this.items = response.data.books;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
}
</style>
