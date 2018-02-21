<template>
  <div class="books">
    <h1>List of Book Club Books</h1>
    <div>
        <router-link v-bind:to="{ name: 'NewBook' }" class="">Add Book</router-link>
    </div>
    <b-table striped hover :items="books"></b-table>
  </div>
</template>
<script>
import BookService from "@/services/BookService";
export default {
  name: "books",
  data() {
    return {
      books: []
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    async getBooks() {
      const response = await BookService.fetchBooks();
      this.books = response.data.books;
    }
  }
};
</script>
