<template>

    <v-card>
        <div class="text-center">
            <h3>Current Reading List</h3>
        </div>
        <v-data-table
            :items="items"
            class="elevation-1"
            hide-actions
            hide-headers
        >
            <template slot="items" slot-scope="props">
            <td><img :src="props.item.thumbnail"> </td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            </template>
        </v-data-table> 
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
          },
          {
            value: false,
            name: '1776',
            thumbnail: 'static/images/1776.jpg',
          },
          {
            value: false,
            name: 'Insignia',
            thumbnail: 'static/images/insignia.jpeg',
          },
          {
            value: false,
            name: 'Hillbilly Elegy',
            thumbnail: 'static/images/hillbilly.jpg',
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

    img{
        max-height: 75px;
        padding: 5px;
    }

    table.table tbody td:first-child, table.table tbody td:not(:first-child), table.table tbody th:first-child, table.table tbody th:not(:first-child), table.table thead td:first-child, table.table thead td:not(:first-child), table.table thead th:first-child, table.table thead th:not(:first-child){
        padding: 0;
    }

</style>