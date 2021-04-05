<template>
  <v-container fill-height>
      <v-row align="center" justify="center">
          <v-col cols="12" md="5" lg="5">
              <v-card :loading="processing" :disabled="processing"  outlined class="pl-lg-10 pr-lg-10 pb-lg-10 ">
                  <v-card-title class="headline">
                    Password Reset
                  </v-card-title>
                  <v-card-subtitle>
                      Enter your email and new password.
                  </v-card-subtitle>
                  <v-spacer></v-spacer>
                  <v-card-text>
               <div ref="form" v-show="!success">
                 <v-text-field 
                 v-model="email"
                 flat
                 label="Email"
                 type="email"
                 solo
                 background-color="grey lighten-3"
                 ></v-text-field>

                  <v-text-field 
                 v-model="password"
                 flat
                 label="New Password"
                 type="password"
                 solo
                 background-color="grey lighten-3"
                 ></v-text-field>

                 
                  <v-text-field 
                 v-model="password_confirmation"
                 flat
                 label="Confirm Password"
                 type="password"
                 solo
                 background-color="grey lighten-3"
                 ></v-text-field>
                  
                 <v-btn  
                 color="primary"
                  width="100%"
                   elevation="0"
                   type="submit"
                   :disabled="disable"
                   @click="send"
                   >
                   Reset Password
                   </v-btn>
                  <div style="color:#b71c1c" class="font-weight-bold" v-if="error">{{ error }}</div>
               </div>
               <div v-show="success != null">
                 <v-alert
                    dense
                    text
                    :type="success ? 'success' : 'error'"
                    >
                    {{message}}
                    <router-link to="/login">Login</router-link> to your account
                    </v-alert>  
               </div>

                </v-card-text>
               </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
mounted(){
    console.log(this.token)
},
  props:["token"],
  data() {
    return {
      processing:false,
          email:'',
          password:'',
          password_confirmation:'',

      success:null,
      message:'',
      error: null
    };
  },
  methods:{
       send(){
     this.processing = true;
     this.success = null;
     this.$store.dispatch('auth/resetPassword',{
         email:this.email,
         password:this.password,
         password_confirmation:this.password_confirmation,
         token:this.token
     })
     .then((res)=>{
       setTimeout(()=>{
          this.processing = false;
        },500)
         this.success = true;
         this.message = res.data.message
         this.form = null;
     }).catch((err) =>{
         this.processing = false;
         this.success = false;
         this.message = err.response.data.errors.email ?  err.response.data.errors.email[0] : err.response.data.message;
     })
 }
  },
 computed:{
    disable(){
        return !this.email || !this.password || !this.password_confirmation
    }
 }
};
</script>
