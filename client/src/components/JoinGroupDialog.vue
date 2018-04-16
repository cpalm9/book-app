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
           <v-select
                    :items="items"
                    item-text="name"
                    overflow
                    label="Select"
                    target="#dropdown-example"
                    v-model="dialogm1"
                    required
                  ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="joinGroup">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import GroupService from '../services/GroupService'
import {UPDATE_USER_GROUP} from '@/store/index'
  export default {
    data () {
      return {
        items: [],
        dialogm1: '',
        dialog: false
      }
    },
    methods: {
      async getGroups() {
        var response = await GroupService.getGroups()
        var groups = response.data.groups
        this.items = groups
      },
      async addMember(id) {
        await GroupService.addMember({
            id: id,
            members: this.$store.state.user
          }).then(res => {
            var user = this.$store.state.user
            this.$root.$emit('updateGroups', res.data.group)
            this.$store.dispatch(UPDATE_USER_GROUP, {group: res.data.group, user: user}).then((res) => {
                if(res.data.status !==200){
                    this.$store.dispatch("Error")
                }
                // console.log(res)
            })
            this.name = ''
            this.dialog = false
          })
      },
      joinGroup: function() {
        this.addMember(this.dialogm1._id)
      }
    },
    mounted() {
      this.getGroups()
    }
  }
</script>

