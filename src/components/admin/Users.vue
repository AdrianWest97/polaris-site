<template>
  <div class="packages my-5">
    <h1 class="subheading grey--text ">Registered Users</h1>
    <div  class=" container-fluid">
<v-card flat class="my-5">
  <v-data-table
    :headers="headers"
    :items="userList"
    sort-by="updated_at"
    class="elevation-0"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
      <v-btn outlined large class="font-weight-bold">Export<v-icon>mdi-download</v-icon></v-btn> 

      <v-dialog
          v-model="dialog"
          max-width="500px"
          v-if="previewUser"
        >
          <v-card>
            <v-card-title></v-card-title>
            <v-card-text>
              <div class=" d-flex flex-column justify-center align-center">
               <v-avatar
                  color="grey lighten-3"
                >
                {{`${previewUser.fname.charAt(0)} ${previewUser.lname.charAt(0)}`}}
                 </v-avatar>
              <p class="headline">{{`${previewUser.fname} ${previewUser.lname}`}}</p>
        </div>
              <v-divider></v-divider>

              <v-container>
               <v-row>
                <v-col cols="12">
                <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>Basic Info</v-list-item-title>
                  <v-list-item-subtitle>
                    Registered: {{previewUser.created_at | moment("MMM D, YYYY") }}
                  </v-list-item-subtitle>
                     <v-list-item-subtitle>
                    Email: {{previewUser.email}}
                  </v-list-item-subtitle>
                     <v-list-item-subtitle>
                    Id tpye: {{previewUser.id_type}}
                  </v-list-item-subtitle>
                     <v-list-item-subtitle>
                    Id #: {{previewUser.id_number}}
                  </v-list-item-subtitle>
                     <v-list-item-subtitle>
                    Phone #: {{previewUser.phone}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
    

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Pickup Address</v-list-item-title>
                  <v-list-item-subtitle>
                   {{previewUser.pick_up.location}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

                <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>US Address</v-list-item-title>
                  <v-list-item-subtitle>
                   Address line: {{previewUser.us_address.address_line}}
                  </v-list-item-subtitle>
                <v-list-item-subtitle>
                   Sate: {{previewUser.us_address.state}}
                </v-list-item-subtitle>
               <v-list-item-subtitle>
                   City: {{previewUser.us_address.city}}
               </v-list-item-subtitle>
            <v-list-item-subtitle>
                   Zip: {{previewUser.us_address.zip_code}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              
                </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>
     <template v-slot:item.created_at="{ item }">
          {{ item.created_at | moment("MMM D, YYYY") }}
        </template>  
          <template v-slot:item.name="{ item }">
          {{`${item.fname} ${item.lname}`}}
        </template>  
 <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="viewInfo(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    <template v-slot:no-data>
      No Users
    </template>
  </v-data-table>
</v-card>
</div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
    loading:false,
      previewUser:null,
      headers: [
        { text: 'Created', value: 'created_at' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'ID Type', value: 'id_type' },
        { text: 'ID #', value: 'id_number' },
        { text: 'Phone #', value: 'phone' },
        { text: 'Pickup Location', value: 'pick_up.location'},
        { text: 'Action', value: 'actions', sortable: false },
      ],
    }),

    methods:{
      viewInfo(item) {
      this.previewUser = item;
        this.dialog = true
      },

       close () {
        this.dialog = false
        this.$nextTick(() => {
          this.previewUser = null;
        })
      },


      deleteItem (id) {
      this.$store.commit('ui/SET_DIALOG_DELETE',{
        visible:true,
        type:'delete_user',
        id:id
      })
      },
    },
    computed: {
      ...mapGetters({
          userList:'admin/users'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

  }
</script>