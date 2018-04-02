<template>
  <v-card>
      <div class="text-center">
          <h3>Current Reading List</h3>
      </div>
      <v-list two-line>
        <template v-for="(item, index) in items" >
          <v-divider :key="item.title"></v-divider>
          <v-list-tile avatar  @click="dialog = true, tileIndex = index" :key="item.title">
            <v-list-tile-avatar>
              <img :src="item.thumbnail">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.author"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-progress-circular
              :size="60"
              :width="15"
              :rotate="-90"
              :value="item.progress"
              color="primary"
            >
              <h6>{{item.progress}}%</h6>

            </v-progress-circular>
          </v-list-tile>
          <!-- <v-dialog v-model="dialog" max-width="500" :key="item.title">
            <v-card class="text-xs-center">
              <v-card-title class="headline">{{items[tileIndex].name}}</v-card-title>
              <img style="max-height: 200px;" :src="items[tileIndex].thumbnail">
              <v-card-text>{{items[tileIndex].author}}</v-card-text>
            </v-card>
          </v-dialog> -->
        </template>
      </v-list>
  </v-card>
</template>

<script>

export default {
  name: "CurrentReadingList",
  data() {
    return {
        dialog: false,
        tileIndex: null,
        items: [
          {
            value: false,
            name: 'Harry Potter',
            thumbnail: 'static/images/HarryPotter.jpg',
            author: 'J.K. Rowling',
            progress: 86,
          },
          {
            value: false,
            name: '1776',
            thumbnail: 'static/images/1776.jpg',
            author: 'David McCullough',
            progress: 57,
          },
          {
            value: false,
            name: 'Insignia',
            thumbnail: 'static/images/insignia.jpeg',
            author: 'S.J. Kincaid',
            progress: 45,
          },
          {
            value: false,
            name: 'Hillbilly Elegy',
            thumbnail: 'static/images/hillbilly.jpg',
            author: 'J. D. Vance',
            progress: 98,
          },
          
        ]
      };
  },
};
</script>

<style scoped>
    h3 {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        padding: 5px;
    }

    table.table tbody td:first-child, table.table tbody td:not(:first-child), table.table tbody th:first-child, table.table tbody th:not(:first-child), table.table thead td:first-child, table.table thead td:not(:first-child), table.table thead th:first-child, table.table thead th:not(:first-child){
        padding: 0;
    }

    .avatar img{
        max-width: 40px;
        border-radius: 0;
    }

    ul.list{
        padding-top: 0;
    }

</style>