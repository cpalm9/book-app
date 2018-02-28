<template>
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
