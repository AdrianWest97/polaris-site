<template>
       <v-dialog
          v-model="newPackageDialog.visible"
          max-width="600px"
          persistent
          :retain-focus="false"
          scrollable
          :overlay-color="$store.state.ui.overlay_color"
        >
        <validation-observer ref="observer" v-slot="{invalid}">
            <v-form ref="form" @submit.prevent="save">
          <v-card :loading="loading" :disabled="loading">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
        <v-col
        cols="6"
        >
         <v-menu
        ref="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
        <validation-provider name="Shipment date" rules="required">
          <v-text-field
            v-model="form.shipment_date"
            label="Shipment Date"
            prepend-icon="mdi-calendar"
            readonly
            slot-scope="{ errors }"
            :error-messages="errors"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </validation-provider>
        </template>
        <v-date-picker
          v-model="form.shipment_date"
          no-title
          scrollable
        >
        </v-date-picker>
          </v-menu>
                 </v-col>
                    <v-col
                    cols="6"
                  >
                <validation-provider name="User" rules="required">
                    <v-autocomplete
                      v-model="form.user_id"
                      :items="users"
                      item-value="id"
                      :item-text="item => item.fname +'  '+ item.lname+ ' '+item.email"
                      label="Select User account"
                      prepend-icon="mdi-account-outline"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    >
                    </v-autocomplete>
                </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                <validation-provider name="description" rules="required">
                    <v-text-field
                      v-model="form.description"
                      label="Description"
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
                      v-model="form.store"
                      label="Store"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-text-field>
                </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                <validation-provider name="courier" rules="required">
                    <v-select
                      v-model="form.courier"
                      label="Courier"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                      :items="courier_services"
                    ></v-select>
                </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                 <validation-provider name="courier_number" rules="required">
                    <v-text-field
                      v-model="form.courier_number"
                      label="Courier #"
                       slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-text-field>
                 </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                 <validation-provider name="weight" rules="required">
                    <v-text-field
                      v-model="form.weight"
                      label="weight"
                      type="number"
                       slot-scope="{ errors }"
                       suffix="lbs"
                     :error-messages="errors"
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
                      v-model="form.tracking_number"
                      label="Tracking #"
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
                 <validation-provider name="status" rules="required">
                    <v-select
                      v-model="form.status"
                      :items="status_types"
                      item-text="status"
                      item-value="id"
                      label="Package status"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                    ></v-select>
                 </validation-provider>
                  </v-col>

                             <v-col
                    cols="12"
                  >
                 <validation-provider name="Due amount" rules="required">
                    <v-text-field
                      v-model="form.due_payment"
                      label="Due amount"
                      type="number"
                      slot-scope="{ errors }"
                     :error-messages="errors"
                      prefix="$"
                    >

                    <template v-slot:append-outer>
                        <validation-provider name="Currency" rules="required">
                       <v-select
                        v-model="form.currency"
                        label="Currency"
                        dense
                        :items="['USD','JMD']"></v-select>
                        </validation-provider>
                    </template>
                    </v-text-field>
                 </validation-provider>
                  </v-col>
                  <v-col cols="12">
                      <v-checkbox
                      v-model="form.notify"
                      label="Send notification email?"
                      ></v-checkbox>
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
              {{buttonTitle}}
              </v-btn>
            </v-card-actions>
          </v-card>
            </v-form>
        </validation-observer>
        </v-dialog>

</template>

<script>
import { mapActions, mapState } from 'vuex'
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
function initialState () {
return {
    loading:false,
courier_services:["FedEx","DHL EXPress","UPS","Purolator","OnTrac Inc","Other"],
menu:null,
date:null,
form:{
 description:'',
 store:'',
 courier:'',
 courier_number:'',
 weight:'',
 tracking_number:'',
 status:'',
 user_id:null,
 due_payment:null,
 currency:'',
 notify:false,
 shipment_date:'',
}
}
}
export default {
data: function (){
    return initialState();
} ,
computed:{
    ...mapState('package',['newPackageDialog']),
    ...mapState('admin',['users','status_types']),
    formTitle(){
        return this.newPackageDialog.mode == 'edit' ? 'Update Package' : 'New Package'
    },
    buttonTitle(){
      return this.newPackageDialog.mode == 'edit' ? 'Update Package' : 'Add Package'
    }
},
watch:{
newPackageDialog(value){
  if(value.mode == 'edit' || value.item){
    this.update_fields();
  }
}
},

methods:{
  ...mapActions({
    successSnack:'ui/successSnack',
    errorSnack:'ui/errorSnack'
    }),

    close(){
        this.$refs.form.reset(); //clear form values
        this.$refs.observer.reset(); //reset validation
        Object.assign(this.$data, initialState());
         this.$nextTick(()=>{
         this.$store.commit('package/SET_NEW_PACKAGE_MODEL',{
         visible:false,
         mode:'add',
         item:null
        })
         });
    },
    save(){
        this.loading = true;
        this.form.mode = this.newPackageDialog.mode;
        this.$store.dispatch('package/add_package',this.form)
       .then(() =>{
         setTimeout(()=>{
          this.loading = false;
         },500);
        //check if it is a prealert package, then delete
        this.removePreAlert(this.form.id);
          this.successSnack("Package added successfully")
         this.close();
       }).catch((err)=>{
         this.loading = false;
         console.error(err);
         this.$nextTick(()=>{
          this.errorSnack(err)
         })
      })
    },
    removePreAlert(id){
        //TODO: can be simplified
      if(this.$store.state.preAlert.pre_alerts.find(item => item.id == id)){
          //delete
          this.$store.dispatch('package/delete_prealert',this.id)
        }
    },

    update_fields(){
     this.form = Object.assign({}, this.newPackageDialog.item)
     this.form.user_id = this.newPackageDialog.item.user.id
     this.form.status = this.newPackageDialog.item.status ? this.newPackageDialog.item.status.id : '';
    }
},

components:{
    ValidationProvider,
    ValidationObserver
}
}
</script>

<style>

</style>
