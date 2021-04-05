<template>
  <v-container fill-height>
      <v-row align="center" justify="center">
          <v-col cols="12" md="5" lg="5">
              <v-card :loading="processing" :disabled="processing"  outlined class="pl-lg-10 pr-lg-10 pb-lg-10 ">
                  <v-card-title class="headline">
                    Welcome back, Sign In
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-card-text>
                     <validation-observer
                        ref="observer"
                        v-slot="{ invalid }"
                      >
                 <v-form ref="form" @submit.prevent="authenticate">
                  <validation-provider
                  v-slot="{ errors }"
                  name="Email "
                  rules="required"
                >
                 <v-text-field
                 v-model="form.email"
                 flat
                 label="Email"
                 :error-messages="errors"
                  required
                 type="text"
                 solo
                 background-color="grey lighten-3"
                 ></v-text-field>
                  </validation-provider>

                  <validation-provider
                  v-slot="{ errors }"
                  name="Email "
                  rules="required"
                >
                 <v-text-field
                 v-model="form.password"
                 flat
                 label="Password"
                 :error-messages="errors"
                  required
                 type="password"
                 solo
                 background-color="grey lighten-3"
                 ></v-text-field>
                  </validation-provider>
                <div class="d-flex justify-end">
                 <v-btn to="/forgot-password" text>Forgot password?</v-btn>
                </div>
                <br>
                 <v-btn
                 color="primary"
                  width="100%"
                   elevation="0"
                   :disabled="invalid"
                   type="submit"
                   >
                   Login
                   </v-btn>

                    <div class="my-5">
                     <v-btn
                      color="grey lighten-3"
                       width="100%"
                       elevation="0"
                       to="/register"
                       >
                       Create a new account
                       </v-btn>
                 </div>
                  </v-form>
                     </validation-observer>
                  <div style="color:#b71c1c" class="font-weight-bold" v-if="errors.email">{{ errors.email[0] }}</div>
                  </v-card-text>
               </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { mapActions} from 'vuex'
 import { required} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })
export default {
  data:() => ({
    valid:true,
    form:{
      email:'',
      password:'',
    },
    errors:[],
    processing:false
  }),
  methods:{
    ...mapActions('auth',['login']),
    authenticate(){
      this.errors = [];
      this.processing = true;
      this.login(this.form)
      .then(()=>{
          setTimeout(()=>{
          this.processing = false;
        },2000)
        //redirect
      this.$router.push(this.$route.query.redirect || '/')
      }).catch((err)=>{
        this.processing = false;
        this.$store.dispatch('ui/errorSnack','Unable to authentication');
        this.errors = err.response.data.errors; //set errors
      })
    },
  },
    components:{
     ValidationProvider,
      ValidationObserver,
  },
  mounted(){
    this.$store.commit('ui/SET_HEADER_FOOTER',false)
  },
}
</script>

<style>

</style>
