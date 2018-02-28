<template>
  <div class="posts">
    <b-container fluid>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-form>
            <b-form-input id="title"
                          type="text"
                          v-model="title"
                          required
                          placeholder="Book Title">
            </b-form-input>
            <br/>
            <b-form-input id="description"
                          type="text"
                          v-model="description"
                          required
                          placeholder="Book Description">
            </b-form-input>
            <br/>
            <b-form-input id="author"
                          type="text"
                          v-model="author"
                          required
                          placeholder="Author">
            </b-form-input>
            <br/>
            <b-form-input id="rating"
                          type="number"
                          v-model="rating"
                          required
                          placeholder="Book Rating">
            </b-form-input>
            <br/>
            <b-button @click="addBook" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BookService from '@/services/BookService'
export default {
  name: 'NewBook',
  data () {
    return {
      title: '',
      description: '',
      author: '',
      rating: ''
    }
  },
  methods: {
    async addBook () {
      await BookService.addBook({
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
<style type="text/css">
</style>