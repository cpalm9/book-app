<template>
  <v-card>
      <div class="text-center">
          <h3>Current Reading List</h3>
      </div>
      <v-list two-line>
        <template v-for="(book) in readingList" >
          <v-divider></v-divider>
          <v-list-tile avatar  @click="dialog = true, tileIndex = index" :key="book.title">
            <v-list-tile-avatar>
              <img :src="book.thumbnail">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="book.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="book.author"></v-list-tile-sub-title>
            </v-list-tile-content>
            <!-- <v-progress-circular
              :size="60"
              :width="15"
              :rotate="-90"
              :value="item.progress"
              color="primary"
            >
              <h6>{{item.progress}}%</h6>
            </v-progress-circular> -->
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
import GroupService from '../services/GroupService'
export default {
  name: "CurrentReadingList",
  data() {
    return {
        dialog: false,
        tileIndex: null,
        readingList: [],
      };
  },
  methods: {
    async getList(){
      var response = await GroupService.currentReadingList()
      this.readingList = response.data.bookList
    }
  },
  mounted() {
    this.getList()
  }
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