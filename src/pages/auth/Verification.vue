<template>
<v-container fill-height>
 <v-row justify="center">
    <v-col cols="12" lg="6">
     <v-alert
     v-show="success || error"      
      text
      :type="success ? 'success' : 'error'"
    >
    {{success ? success : error}}
    </v-alert>
        <v-card :loading="loading" :disabled="loading" >
            <v-card-title class="headline">Email verification</v-card-title>
            <v-card-text>
                To continue, please check your inbox for a verification link. If
                You did not receive the email, click the button below to request another
                <v-spacer></v-spacer>
                <v-btn @click="verifyResend" large color="warning" depressed class="my-5">Send Verification</v-btn>
            </v-card-text>
        </v-card>
    </v-col>
 </v-row>
</v-container>
</template>

<script>
import {  mapActions } from "vuex";
export default {
 data:() => ({
     loading:false,
     success: null,
     error: null
 }),
  methods: {
    ...mapActions("auth", ["sendVerifyResendRequest"]),
    verifyResend() {
      this.success = this.error = null;
      this.loading = true;
      this.sendVerifyResendRequest()
        .then(() => {
          this.success =
            "A fresh verification link has been sent to your email address.";
                    setTimeout(()=>{
            this.loading = false;
        },1000)
        })
        .catch(error => {
          this.error = "Error sending verification link.";
            setTimeout(()=>{
            this.loading = false;
        },1000)
        console.log(error)
        });
    }
  },
created(){
this.$store.commit('ui/SET_HEADER_FOOTER',true)
}
}
</script>

<style>

</style>