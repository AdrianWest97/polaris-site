
<template>
  <div>
  <SideBar :loading="loading"/>
  <Header/>
  <v-container fill-height v-if="loading">
    <Loading/>
  </v-container>
    <div class="mx-4 mb-4" v-else>
      <!--initial view -->
     <Packages v-show="$route.path === '/dashboard'"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import SideBar from '../../components/admin/SideBar'
import Header from '../../components/admin/Header.vue'
import Packages from '../../components/admin/Packages.vue'
import Loading from '../../components/common/Loading';

  export default {
  components: { SideBar,Header, Packages, Loading },
  data:() => ({
    loading:true
  }),
    methods:{
      initialize() {
            this.$store.dispatch('admin/loadDashboard')
            .then((results) => {
                this.$store.commit('preAlert/SET_PRE_ALERTS', results[1].data.pre_alerts); //set all pre alerts
                this.$store.commit('package/SET_PACKAGES',results[0].data.packages)
                this.$store.commit('payment/SET_PAYMENTS', results[2].data.payments); //set all payments
                // this.$store.commit('product/SET_PRODUCTS', results[3].data.products); //set all products
                //set settings
                this.$store.commit('admin/SET_PICKUP_LOCATIONS', results[4].data.pick_ups);
                this.$store.commit('admin/SET_STATUS_TYPES', results[4].data.package_status);
                this.$store.commit('admin/SET_US_ADDRESSES', results[4].data.us_addresses);
                this.$store.commit('admin/SET_USERS', results[5].data.users); //set users
                this.loading = false;
            }).catch(err => console.log(err));
          },
    },



    created(){
      this.initialize();
          this.$store.commit('ui/SET_HEADER_FOOTER',false)

    },
  }
</script>
