<template>
  <div class="packages my-5">
    <h1 class="subheading grey--text ">Packages</h1>
    <div  class="container-fluid">
   <v-card flat class="my-5">
      <v-data-table
    :headers="headers"
    :items="getPackages"
    sort-by="package_number"
    class="elevation-0"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
          <v-btn-toggle
          >
        <v-btn outlined class="font-weight-bold"  @click="openDialog()">Add Package <v-icon>mdi-plus</v-icon></v-btn>
       <v-btn :disabled="getPackages.length < 1" outlined class="font-weight-bold">Export <v-icon>mdi-download</v-icon></v-btn>
          </v-btn-toggle>
      </v-toolbar>
    </template>
        <template v-slot:item.updated_at="{ item }">
          {{ item.updated_at | moment("MMM D, YYYY") }}
        </template>

        <template v-slot:item.user="{ item }">
          {{`${item.user.fname} ${item.user.lname}`}}
        </template>
           <template v-slot:item.due_payment="{ item }">
          <v-chip
          label
          color="success"
          small
          close
          close-icon="mdi-check"
          class="font-weight-bold"
          v-if="item.payment">
            {{'Payed'.toUpperCase()}}
          </v-chip>
          <span v-else>{{`${$helpers.formatMoney(item.due_payment)} ${item.currency}`}}</span>
        </template>
                <template v-slot:item.weight="{ item }">
          {{ `${item.weight} (lbs)` }}
        </template>
          <template v-slot:item.status="{ item }">
         <v-chip
         small
        class="font-weight-bold"
         label
        :color="item.status.color"
      >
      {{item.status.status}}
         </v-chip>
        </template>

    <template v-slot:item.actions="{ item }">
      <v-btn-toggle>
         <v-dialog
          v-model="dialog"
          max-width="500px"
          v-if="!item.payment"
          :retain-focus="false"
          :overlay-color="$store.state.ui.overlay_color"
        >
          <template v-slot:activator="{ on, attrs }">
             <v-icon
             v-bind="attrs"
              v-on="on"
             >mdi-cash-multiple</v-icon>
          </template>
          <v-card :loading="loading" :disabled="loading" >
            <v-form ref="payment_form" lazy-validation v-model="valid" @submit.prevent="addPayment(item)">
            <v-card-title>
              <span class="headline">Add payment for {{item.description}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                   <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  <v-text-field
                  v-text="`Account: ${item.user.fname} ${item.user.lname}`"
                  >
                  </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select
                      v-model="payment.method"
                      :items="['Credit Card','Cash','Other']"
                      label="Payment method"
                      required
                      :rules="required"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="payment.currency"
                      label="Currency"
                      :items="['USD','JMD']"
                      required
                       :rules="required"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                  >
                    <v-text-field
                      :value="item.due_payment"
                      label="Payment"
                      readonly
                      type="number"
                      prefix="$"
                      required
                      :rules="required"

                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
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
                type="submit"
                :disabled="!valid"
              >
                Add payment
              </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

      <v-icon
        class="mr-2"
        small
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>


      <v-icon
      small
        @click="deleteItem(item.id)"
      >
        mdi-delete
      </v-icon>
      </v-btn-toggle>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="accent"
        @click="initialize"
        depressed
      >
        Refresh
      </v-btn>
    </template>
  </v-data-table>
   </v-card>
</div>
<NewPackage/>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import NewPackage from './NewPackage.vue'
  export default {
  components: { NewPackage},
    data: () => ({
      dialog: false,
      dialogDelete: false,
      loading:false,
      toggle_exclusive: undefined,
      headers: [
        { text: 'Created', value: 'updated_at' },
        {text: 'Package #', align: 'start',value: 'package_number'},
        { text: 'Description', sortable:false, value: 'description' },
        { text: 'Store', value: 'store' },
        { text: 'Courier', value: 'courier' },
        { text: 'Courier #', value: 'courier_number' },
        { text: 'Weight', value: 'weight' },
        { text: 'Tracking #', value: 'tracking_number' },
        { text: 'Status', value: 'status' },
        { text: 'Account', value: 'user' },
        { text: 'Due amount', value: 'due_payment' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
      valid:true,
      //payment rule
        required: [
        v => !!v || 'This field is required',
      ],
      payment:{
        method:'',
        package_id:null,
        user_id:null,
        amount:0,
        currency:''
      }

    }),

    computed: {
      ...mapGetters('package',['getPackages'],'ui','showSnackBar')
    },


    methods: {
      ...mapActions({
        successSnack:'ui/successSnack',errorSnack:'ui/errorSnack'
      }),
      async initialize () {
        this.loading = true;
        await this.$store.dispatch('package/loadPackages')
        .then(()=>{
          setTimeout(()=>{
            this.loading = false;
          },2000)
        }).catch((err) => this.errorSnack(err))
      },

      openDialog(){
        this.$store.commit('package/SET_NEW_PACKAGE_MODEL',{
          visible:true,
          package:null,
          mode:'add'
        })
      },
      close(){
        this.dialog = false
        this.$refs.payment_form.resetValidation();
      },
      addPayment(item){
          this.$refs.payment_form.validate();
        if(this.valid){
        this.payment.package_id = item.id;
        this.payment.user_id = item.user_id
        this.payment.amount = item.due_payment
        this.$store.dispatch('payment/addPayement',this.payment)
        .then((res) => {
          this.$store.commit('package/UPDATE_PACKAGE',res.data);
          this.successSnack("Payment success");
          this.close();
        })
        .catch(()=> this.errorSnack("Unable to complete payment"))
      }
      },

      editItem(item){
          this.$store.commit('package/SET_NEW_PACKAGE_MODEL',{
          visible:true,
          mode:'edit',
          item:item,
        })
      },

      deleteItem (id) {
      this.$store.commit('ui/SET_DIALOG_DELETE',{
        visible:true,
        type:'delete_package',
        id:id
      })
      },
    },
  }
</script>
