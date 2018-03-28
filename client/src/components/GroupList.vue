<template>
      <v-card>
        <v-toolbar style="background-color: #E8AB3C;" dark>
          <v-toolbar-title>My Groups</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line subheader>
          <v-list-tile avatar v-for="(item) in items" :key="item.title" @click="$router.push({name: 'Group', params: {id: item.groupName }})">
            <v-list-tile-avatar>
              <v-icon class="grey lighten-1 white--text">group</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.groupName }}</v-list-tile-title>
              <v-list-tile-sub-title># of members: {{ item.numMembers }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon style="color: #0B3C5D;" @click="">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider inset></v-divider>
          <div>
            <create-group-dialog/>
            <join-group-dialog/>
          </div>
        </v-list>
      </v-card>
</template>
<script>

import CreateGroupDialog from './CreateGroupDialog.vue';
import JoinGroupDialog from './JoinGroupDialog.vue';

export default {
  name: "GroupList",
  data() {
    return {
      items: [
        { groupName: 'Group 1', numMembers: '34' },
        { groupName: 'Group 2', numMembers: '2383' },
        { groupName: 'Group 3', numMembers: '123' },
      ]
    }
  },
  components: {
      CreateGroupDialog,
      JoinGroupDialog,
  }
}
</script>

<style scoped>
    .card{
        margin: 1.5rem;
        border-radius: .25rem;
    }

    .btn{
        margin-top: 1rem;
    }

</style>