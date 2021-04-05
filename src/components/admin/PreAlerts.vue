<template>
  <div class="packages my-5">
    <h1 class="subheading grey--text ">Pre Alerts</h1>
    <div  class=" container-fluid">
<v-card flat class="my-5">
  <v-data-table
    :headers="headers"
    :items="preAlerts"
    sort-by="updated_at"
    class="elevation-0"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
        <v-btn :disabled="preAlerts.length < 1" outlined large class="font-weight-bold">Export<v-icon>mdi-download</v-icon></v-btn>
      </v-toolbar>
    </template>

         <template v-slot:item.user="{ item }">
            {{`${item.user.fname} ${item.user.lname}`}}
          </template>

     <template v-slot:item.updated_at="{ item }">
          {{ item.updated_at | moment("MMM D, YYYY") }}
        </template>
          <template v-slot:item.weight="{ item }">
          {{ `${item.weight} (lbs)` }}
        </template>


    <template v-slot:item.actions="{ item }">
      <v-icon
        class="mr-2"
        @click="addPreAlert(item)"
      >
        mdi-plus-box
      </v-icon>
      <v-icon
        @click="deleteItem(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No Pre Alerts
    </template>
  </v-data-table>
</v-card>
  <NewPackage/>
</div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import NewPackage from './NewPackage'
  export default {
    data: () => ({
    loading:false,
      headers: [
        { text: 'Date', value: 'updated_at' },
        { text: 'Account', value: 'user' },
        { text: 'Description', value: 'description' },
        { text: 'Store', value: 'store' },
        { text: 'Weight', value: 'weight' },
        { text: 'Tracking #', value: 'tracking_number' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
    }),

    computed: {
      ...mapGetters('preAlert',['preAlerts'])
    },
     addPreAlert(item){
       this.$store.commit('preAlert/SET_NEW_PACKAGE_MODEL',{
         visible:true,
         mode:'add',
         item:item,
         is_prealert:true
       })
     },

       deleteItem (id) {
      this.$store.commit('ui/SET_DIALOG_DELETE',{
        visible:true,
        type:'delete_pre_alert',
        id:id
      })
      },
    components:{
      NewPackage
    }
  }
</script>
