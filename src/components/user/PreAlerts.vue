<template>
<v-card flat class="my-5">
    <v-card-title>
      <v-spacer></v-spacer>
      <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              outlined
              small
            >
             <v-icon>mdi-plus</v-icon> Pre Alert 
            </v-btn>
          </template>
         <validation-observer ref="observer" v-slot="{invalid}">
          <v-card :loading="loading" :disabled="loading" >
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <validation-provider name="description" rules="required">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Item name"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                <validation-provider name="store" rules="required">
                    <v-text-field
                      v-model="editedItem.store"
                      label="Store"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-text-field>
                </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                <validation-provider name="weight" rules="required">
                    <v-text-field
                      v-model="editedItem.weight"
                      label="Weight"
                      type="number"
                      slot-scope="{ errors }"
                      :error-messages="errors"
                      suffix="(lbs)"
                    ></v-text-field>
                </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
             <validation-provider name="tracking_number" rules="required">
                    <v-text-field
                      v-model="editedItem.tracking_number"
                      label="Tracking #"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-text-field>
             </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.instructions"
                      label="Intructions"
                    ></v-text-field>
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
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
               :disabled="invalid"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
         </validation-observer>
        </v-dialog>
    </v-card-title>

  <v-data-table
    :headers="headers"
    :items="preAlerts"
    sort-by="calories"
    class="elevation-0"
  >
     <template v-slot:item.updated_at="{ item }">
          {{ item.updated_at | moment("MMM D, YYYY") }}
        </template>   

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No Pre Alerts
    </template>
  </v-data-table>
</v-card>
</template>


<script>
import { mapGetters } from 'vuex'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { required, max } from 'vee-validate/dist/rules'
setInteractionMode('eager')
extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })
  export default {
    data: () => ({
    loading:false,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Date', value: 'updated_at' },
        { text: 'Description', value: 'description' },
        { text: 'Store', value: 'store' },
        { text: 'Weight (lbs)', value: 'weight' },
        { text: 'Tracking #', value: 'tracking_number' },
        { text: 'Status', value: 'approved' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        updated_at: '',
        description: '',
        store: '',
        weight: 0,
        tracking_number: '',
        instructions:'',
        mode:'',
        id:null
      },
      defaultItem: {
        updated_at: '',
        description: '',
        store: '',
        weight: 0,
        tracking_number: '',
        instructions:'',
        mode:'',
        id:null
      },      
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Pre Alert' : 'Edit Item'
      },
      ...mapGetters('user',['preAlerts'])
    },

    methods: {
      editItem (item) {
       this.editedItem.mode = 'edit'
       this.editedIndex = this.preAlerts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
      console.log(item)
      },

        close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        this.loading = true;
        this.editedIndex > -1 ? this.editedItem.mode = 'edit' : this.editedItem.mode = 'add';
        this.$store.dispatch('user/addPreAlert',this.editedItem)
            .catch(err => {
               console.log(err)
           }).finally(()=>{
            setTimeout(() => {
            this.loading = false;
               }, 2000);
              this.close();
           });
      },
    },
    components:{
        ValidationObserver,
        ValidationProvider
    },
     watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
  }
</script>