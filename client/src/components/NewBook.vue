<template>
  <div class="posts">
    <h1>Add Book</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description"></textarea>
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="AUTHOR" v-model="author"></textarea>
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="RATING" v-model="rating"></textarea>
        </div>
        <div>
          <button class="app_post_btn" @click="addBook">Add</button>
        </div>
      </div>
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
      this.$router.push({ name: 'Books' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>