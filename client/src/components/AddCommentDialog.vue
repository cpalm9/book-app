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
              <v-flex xs12>
                  <v-select
                    :items="groups"
                    item-text="name"
                    overflow
                    label="Select"
                    target="#dropdown-example"
                    v-model="group"
                    required
                  ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addNotification">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import NotificationService from '../services/NotificationService'
import GroupService from '../services/GroupService'
  export default {
    data () {
      return {
        dialog: false,
        comment: '',
        datePosted: '',
        group: '',
        groups: [],
        user: ''
      }
    },
    methods: {
      async addNotification() {
        await NotificationService.addNotification({
          comment: this.comment,
          datePosted: Date.now(),
          group: this.group,
          user: this.$store.state.user.name
        }).then((res)=>{
          this.dialog = false
          this.comment = ''
          this.$root.$emit('notification-added')
        })
      },
      async getGroups() {
        var response = await GroupService.getGroups()
        var groups = response.data.groups
        var userGroups = []
        for(var p in groups){
          if (groups[p].members[0] === this.$store.state.user.id){
            userGroups.push(groups[p])
          }
        }
        this.groups = userGroups
      }
    },
    mounted() {
      this.getGroups()
    }
  }
</script>

