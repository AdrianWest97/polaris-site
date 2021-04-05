<template>
  <v-container fill-height>
      <v-row align="center" justify="center">
          <v-col cols="12" md="5" lg="5">
               <v-alert
      dense
      v-show="success != null"
      text
      :type="success ? 'success' : 'error'"
    >
    {{message}}
    </v-alert>
              <v-card :loading="processing" :disabled="processing"  outlined class="pl-lg-10 pr-lg-10 pb-lg-10 ">
                  <v-card-title class="headline">
                    Password Reset
                  </v-card-title>
                  <v-card-subtitle>
                      Enter your email address to reset your password.
                  </v-card-subtitle>
                  <v-spacer></v-spacer>
                  <v-card-text>
                      
                 <v-text-field 
                 v-model="email"
                 flat
                 label="Email"
                 type="email"
                 solo
                 background-color="grey lighten-3"
                 ></v-text-field>
                  
                 <v-btn  
                 color="primary"
                  width="100%"
                   elevation="0"
                   type="submit"
                   :disabled="!email"
                   @click="send"
                   >
                   Send reset link
                   </v-btn>
                  </v-card-text>
               </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
data(){
    return {
        email:'',
        error:null,
        processing:false,
        success:null,
        message:'',
    }
},
methods:{
 send(){
     this.processing = true;
     this.success = null;
     this.$store.dispatch('auth/sendPasswordResetRequest',{
         email:this.email
     })
     .then((res)=>{
       setTimeout(()=>{
          this.processing = false;
        },500)
         this.success = true;
         this.message = res.data.message
         this.email = '';
     }).catch((err) =>{
         this.processing = false;
         this.success = false;
         this.message = err.response.data.errors.email ?  err.response.data.errors.email[0] : err.response.data.message;
     })
 }
}
}
</script>

<style>

</style>