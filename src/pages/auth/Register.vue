<template>
  <v-container fill-height>
      <v-row align="center" justify="center">
          <v-col cols="12" md="6" lg="6">
              <v-card :loading="processing" :disabled="processing" outlined  class="pl-lg-10 pr-lg-10 pb-lg-10">
                  <v-card-title class="headline">Create account</v-card-title>
                  <v-spacer></v-spacer>
                  <v-card-text>
              <validation-observer ref="observer" v-slot="{invalid}">
                 <v-form ref="form" @submit.prevent="save">
                 <v-row dense >
                    <v-col cols="6">
                   <validation-provider name="First name" rules="required">
                <v-text-field 
                 flat
                 v-model="form.fname"
                 label="First Name"
                 type="text"
                 solo
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
               :error-messages="errors"
                 ></v-text-field>
                   </validation-provider>

                    </v-col>
                <v-col cols="6">
                <validation-provider name="Last name" rules="required">
                    <v-text-field 
                 label="Last Name"
                 flat
                  v-model="form.lname"            
                 type="text"
                 solo
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
                :error-messages="errors"
                 ></v-text-field> 
                </validation-provider>
                </v-col>

                <v-col cols="12">
                 <validation-provider name="Email" rules="required">
                  <v-text-field 
                 label="Email"
                 flat
                 v-model="form.email"
                 type="email"
                 solo
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
                :error-messages="errors"
                 ></v-text-field> 
                 </validation-provider>
                </v-col>

              <v-col cols="6">
             <validation-provider name="Password" rules="required">
                <v-text-field 
                 flat
                 label="Password"
                 type="password"
                v-model="form.password"
                 solo
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
                :error-messages="errors"
                 ></v-text-field>
             </validation-provider>
                    </v-col>
                <v-col cols="6">
              <validation-provider name="Confirm password" rules="required">
                    <v-text-field 
                 label="Confirm Password"
                 flat
                 type="password"
                  v-model="form.password_confirmation"
                 solo
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
                :error-messages="errors"
                 ></v-text-field> 
              </validation-provider>
                </v-col>
                    <v-col
                class="d-flex"
                cols="12"
                sm="6"
            >
       <validation-provider name="ID type" rules="required">
        <v-select
          :items="['Passport','TRN']"
          solo
          flat
          v-model="form.id_type"
          background-color="grey lighten-3"
          label="ID type"
          slot-scope="{ errors }"
           :error-messages="errors"
        ></v-select>
       </validation-provider>
      </v-col>
                <v-col cols="6">
             <validation-provider name="ID number" rules="required">
                <v-text-field 
                 label="ID Number"
                 flat
                 v-model="form.id_number"
                 solo
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
                 :error-messages="errors"
                 ></v-text-field> 
             </validation-provider>
                </v-col>   
                 <v-col cols="12">
              <validation-provider name="Mobile #" rules="required">
                <v-text-field 
                 label="Mobile Number"
                 flat
                 v-model="form.phone"
                 solo
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
                 :error-messages="errors"
                 ></v-text-field> 
              </validation-provider>
                </v-col> 
                 <v-col cols="12">
              <validation-provider name="Street" rules="required">
                <v-text-field 
                 label="Street Address"
                 flat
                 solo
                 v-model="form.street"
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
                 :error-messages="errors"
                 ></v-text-field> 
              </validation-provider>
                </v-col> 
                <v-col cols="6">
             <validation-provider name="City" rules="required">
                <v-text-field 
                 label="City"
                 flat
                 solo
                v-model="form.city"
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
                 :error-messages="errors"
                 ></v-text-field> 
             </validation-provider>
                </v-col> 
                     <v-col cols="6">
              <validation-provider name="Parish" rules="required">
                <v-select
                 label="Select parish"
                 :items="$store.state.ui.parishes"
                 flat
                 solo
                v-model="form.parish"
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
                  :error-messages="errors"
                 ></v-select>
              </validation-provider> 
                </v-col> 

              <v-col cols="12">
             <validation-provider name="Pickup Location" rules="required">
                <v-select
                 label="Preffered pickup location"
                 flat
                 solo
                 v-model="form.pickup_id"
                 :items="locations"
                 item-text="location"
                 item-value="id"
                 background-color="grey lighten-3"
                 slot-scope="{ errors }"
                 :error-messages="errors"
                 ></v-select> 
             </validation-provider>
                </v-col>
                </v-row>
                 <v-btn  color="primary" type="submit" :disabled="invalid" width="100%" elevation="0">Sign Up</v-btn>
                 </v-form>
              </validation-observer>
              <div>
                <ul style="" v-for="(error,index) in errors" :key="index">
                  <li style="color:#b71c1c" class="font-weight-bold">{{error[0]}}</li>
                </ul>
              </div>
                  </v-card-text>
               </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import Api from  "../../apis/Api"
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
  components:{
    ValidationObserver,
    ValidationProvider
  },
  data:() => ({
    locations:[],
    processing:false,
    errors:[],
    form:{
      fname:'',
      lname:'',
      email:'',
      password:'',
      password_confirmation:'',
      id_type:'',
      id_number:'',
      phone:'',
      street:'',
      city:'',
      parish:'',
      pickup_id:null
    }
  }),
  mounted(){
    this.$store.commit('ui/SET_HEADER_FOOTER',false)
  },
  created(){
    this.initialize();
  },
  methods:{
    initialize(){
      Api().get('/pick_up_locations')
      .then((res)=> this.locations = res.data)
      .catch(err => console.log(err))
    },
    save(){
      this.processing = true;
     this.$store.dispatch("auth/register",this.form)
     .then(()=>{
         setTimeout(()=>{
          this.processing = false;
        },2000)
          this.$router.push({path:'/manage'})
     })
     .catch((err) => {
      this.processing = false;
       console.log(err);
       this.errors = err.response.data.errors
     })
    }
  }
}
</script>

<style>

</style>