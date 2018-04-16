<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn style="background-color: #0B3C5D;" dark slot="activator">Create</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline" style="color: #2660A4;">Create New Group</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Group Name" v-model="name" required></v-text-field>
              </v-flex>
              <!-- <v-flex xs12>
                  <v-text-field label="Description" multi-line v-model="description" required></v-text-field>
              </v-flex>
              <v-flex v-if="switch1" xs12>
                <v-switch :label="`Private Group`" v-model="switch1"></v-switch>
              </v-flex>
              <v-flex v-else xs12>
                <v-switch :label="`Public Group`" v-model="switch1"></v-switch>
              </v-flex>
              <v-flex v-show="switch1" xs12>
                <v-text-field label="Password" type="password" required v-model="password"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  label="Interests"
                  multiple
                  autocomplete
                  chips
                  :items="['Art', 'Biography', 'Business', 'Childrens', 'Christian', 'Classics', 'Comics', 'Crime', 'Fantasy', 'Fiction', 'History', 'Horror', 'Humor', 'Music', 'Mystery', 'NonFiction', 'Philosophy', 'Poetry', 'Political', 'Psychology', 'Religion', 'Romance', 'Science', 'Science Fiction', 'Self Help', 'Sports', 'Thriller', 'Travel', 'Young Adult']"
                ></v-select>
              </v-flex> -->
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
import GroupService from '@/services/GroupService'
import {UPDATE_USER_GROUP} from '@/store/index'
  export default {
    data () {
      return {
        dialog: false,
        switch1: false,
        name: '',
        members: []
      }
    },
    methods: {
      async addGroup () {
        await GroupService.addGroup({
          name: this.name,
        }).then((res) => {
          var id = res.data.group._id
          this.addMember(id)
          var user = this.$store.state.user
          // console.log(res.data)
          this.$store.dispatch(UPDATE_USER_GROUP, {group: res.data.group, user: user}).then((res) => {
                if(res.data.status !==200){
                    this.$store.dispatch("Error")
                }
                // console.log(res)
            })
        })
        this.dialog = false;
      },
      async addMember(id) {
        await GroupService.addMember({
            id: id,
            members: this.$store.state.user
          }).then(res => {
            this.$root.$emit('updateGroups', res.data.group)
            this.name = ''
          })
      },
    }
  }
</script>

