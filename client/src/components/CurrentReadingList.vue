<template>

    <v-card>
        <div class="text-center">
            <h3>Current Reading List</h3>
        </div>
        <v-list two-line>
          <template v-for="item in items">
            <v-divider></v-divider>
            <v-list-tile avatar  @click="">
              <v-list-tile-avatar>
                <img :src="item.thumbnail">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.author"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
    </v-card>

</template>
<script>

export default {
  name: "CurrentReadingList",
  data() {
    return {
        items: [
          {
            value: false,
            name: 'Harry Potter',
            thumbnail: 'static/images/HarryPotter.jpg',
            author: 'J.K. Rowling',
          },
          {
            value: false,
            name: '1776',
            thumbnail: 'static/images/1776.jpg',
            author: 'David McCullough',
          },
          {
            value: false,
            name: 'Insignia',
            thumbnail: 'static/images/insignia.jpeg',
            author: 'S.J. Kincaid',
          },
          {
            value: false,
            name: 'Hillbilly Elegy',
            thumbnail: 'static/images/hillbilly.jpg',
            author: 'J. D. Vance',
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