<template>
    <v-flex xs4>
    <v-card>
        <v-card-title>
          <span class="headline">Edit {{title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
              <v-flex>
                <v-text-field label="Title" v-model="title" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Description" v-model="description" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Author" v-model="author" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Rating" v-model="rating"></v-text-field>
              </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="$router.push({name: 'Home'})">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addBook">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
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