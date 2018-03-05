<template>

    <v-card>
        <div class="text-center">
            <h3>Recommendations</h3>
        </div>
        <carousel>
            <slide v-for="item in items">
                <a href="">
                    <img :src=item.src alt="">
                </a>
            </slide>
        </carousel>
    </v-card>

</template>
<script>

export default {
  name: "Suggestions",
  data() {
    return {
        items: [
          {
            src: '/static/images/HarryPotter.jpg'
          },
          {
            src: '/static/images/1776.jpg'
          },
          {
            src: '/static/images/insignia.jpeg'
          },
          {
            src: '/static/images/hillbilly.jpg'
          }
        ]
      };
  },
};
</script>

<style scoped>
    img{
        max-width: 80px;
        max-height: 120px;
    }
</style>