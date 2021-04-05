<template>
  <v-container>
    <Loading v-if="loading"/>
    <v-row justify="center" v-else>
      <v-col cols="12">
     <v-tabs
      center-active
      color="deep-purple accent-4"
     >
      <v-tab>Packages</v-tab>
      <v-tab >Deliveries</v-tab>
      <v-tab>Pre Alers</v-tab>
      <v-tab>Purchases</v-tab>
      <v-tab>Invoices</v-tab>
    
        <v-tab-item
        :transition="false"
        class="pa-5"

      >
      <Packages/>
      </v-tab-item>
           <v-tab-item
      :transition="false"
      class="pa-5"
      >
      <Deliveries/>
      </v-tab-item>
        <v-tab-item
          :transition="false"
          class="pa-5"
      >
      <PreAlerts/>
      </v-tab-item>
      <v-tab-item
      :transition="false"
          class="pa-5"
      >
      </v-tab-item>
            <v-tab-item
      :transition="false"
          class="pa-5"
      >
      <Invoices/>
      </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Packages from '../components/user/Packages.vue';
import PreAlerts from '../components/user/PreAlerts.vue';
import Deliveries from '../components/user/Deliveries'
import Invoices from '../components/user/Invoices.vue';
import Loading from '../components/common/Loading';
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Deliveries, Packages, PreAlerts, Invoices, Loading },
  data:() => ({
    loading:true
  }),
    computed: {
    ...mapGetters("auth", ["user"])
  },
  methods:{
   ...mapActions("auth", ["sendVerifyResendRequest","checkVerified"]),
    initialize(){
    this.$store.commit('ui/SET_HEADER_FOOTER',true)
    this.$store.dispatch('user/loadPackagesPayments')
    .catch((err) => {
      this.$store.dispatch('ui/errorSnack','Unable to load dara')
      console.log(err)
    })
    }
  },
 created(){
  this.checkVerified()
  .then((res) =>{
    //if not verified
    if(!res){
      this.$router.push('/verification')
    }else{
      this.initialize();
      this.loading = false;
    }
  })
  },
}

</script>

<style>

</style>