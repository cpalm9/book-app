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
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
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
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          
        ]
      };
  },
};
</script>

<style scoped>
    h3 {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

</style>