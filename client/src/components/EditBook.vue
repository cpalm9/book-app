<template>
  <div class="books">
    <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-card-title primary-title>
        <h1>Edit Book</h1>
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-text-field
          label="Title"
          v-model="title"
          required
        ></v-text-field>
        <v-text-field
          label="Description"
          v-model="description"
          required
        ></v-text-field>
        <v-text-field
          label="Author"
          v-model="author"
          required
        ></v-text-field>
        <v-text-field
          label="Rating"
          v-model="rating"
          required
        ></v-text-field>
        <v-btn @click="updatePost" :disabled="!valid">
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-card>
    </v-flex>
  </div>
</template>

<script>
import BookService from '@/services/BookService'
export default {
  name: 'EditBook',
  data () {
    return {
      title: '',
      description: '',
      author: '',
      rating: ''
    }
  },
  mounted () {
    this.getBook()
  },
  methods: {
    async getBook () {
      const response = await BookService.getBook({
        id: this.$route.params.id
      })
      this.title = response.data.title
      this.description = response.data.description
      this.author = response.data.author
      this.rating = response.data.rating
    },
    async updatePost () {
      await BookService.updateBook({
        id: this.$route.params.id,
        title: this.title,
        description: this.description,
        author: this.author,
        rating: this.rating
      })
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>