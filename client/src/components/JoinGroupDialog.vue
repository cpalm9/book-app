<template>
     <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-btn style="background-color: #FF6B35;" dark slot="activator">Join</v-btn>
      <v-card>
        <v-card-title>
            <v-text-field
                light
                solo
                append-icon="search"
                placeholder="Find A Group">
            </v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group v-for="item in items" :key="item.title" v-model="dialogm1" column>
            <v-radio :label=item.groupName :value=item.groupName></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        items: [
        { groupName: 'Group 1'},
        { groupName: 'Group 2'},
        { groupName: 'Group 3'},
        { groupName: 'Group 4'},
      ],
        dialogm1: '',
        dialog: false
      }
    }
  }
</script>

