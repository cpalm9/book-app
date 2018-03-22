<template>

    <v-card>
        <v-card-media src="static/images/milky-way.jpg" height="150px">
        </v-card-media>
        <v-card-title primary-title>
            <div>
                <img class="userPic" src="static/images/einstein.jpg">
                <h6 class="headline mb-0">{{name}}</h6>
                <div>Random facts about why I love books and why I am on this site!</div>
            </div>
        </v-card-title>
        <!-- <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions> -->
        <ul class="userBookInfo" style="padding:0;">
            <li class="bookStats" style="border-right: 1px solid #d4dbe0;">
                <a href="#">
                    Books Read
                    <h6 style="margin-bottom:0;">12M</h6>
                </a>
            </li>
            <li class="bookStats">
                <a href="#">
                    Groups
                    <h6 style="margin-bottom:0;">3</h6>
                </a>
            </li>
        </ul>
    </v-card>

</template>
<script>

export default {
  name: "UserComponent",
  data() {
    return {
      name: this.$store.state.user.name
    };
  },
};
</script>

<style scoped>
    .userPic{
        max-height: 100px;
        margin-top: -75px;
        border: 3px solid #fff;
        border-radius: 100%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        position: relative;
    }

    .bookStats{
        display: inline-block;
        padding: 0 10px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        margin-bottom: 2.5rem;
    }

</style>