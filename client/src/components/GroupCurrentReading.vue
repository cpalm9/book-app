<template>

    <v-card>
        <v-toolbar style="background-color: #E8AB3C;" dark>
          <v-toolbar-title>Currently Reading</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title id="bookContent">
            <div>
                
                <img class="bookPic" :src="thumbnail">
                <h6 class="headline mb-0">{{title}}</h6>
                <div>{{author}}</div>
            </div>
        </v-card-title>
        <div id="progressBar">
            <h5>Progress: {{valueDeterminate}}%</h5>
            <v-progress-linear v-model="valueDeterminate" height="15"></v-progress-linear>
        </div>
    </v-card>

</template>
<script>

export default {
  name: "GroupCurrentReading",
  data() {
    return {
        title: '1776',
        thumbnail: 'static/images/1776.jpg',
        author: 'David McCullough',
        valueDeterminate: 50
    };
  },
};
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

    #progressBar{
        text-align: left;
        max-width: 300px;
        margin: 2rem;
        padding-bottom: 25px;
    }

</style>