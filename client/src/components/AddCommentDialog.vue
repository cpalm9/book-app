<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn style="background-color: #2660A4;" dark slot="activator"><v-icon dark>add</v-icon></v-btn>
      <v-card>
        <v-card-title>
          <span class="headline" style="color: #2660A4;">New Comment</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                  <v-text-field label="Comment" multi-line v-model="comment" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addGroup">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        comment: ''
      }
    }
  }
</script>

