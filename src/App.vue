<template>
  <v-app>
    <div>
    <v-system-bar
      dark
      v-show="getHeaderFooter"
    >
      <v-spacer></v-spacer>
      <v-icon>fab fa-facebook</v-icon>
      <v-icon>fab fa-twitter</v-icon>
      <v-icon>fab fa-instagram</v-icon>
    </v-system-bar>
  </div>
  <v-app-bar v-show="getHeaderFooter" flat max-height="65" class="transparent">
      <Header/>
    </v-app-bar>
    <v-divider></v-divider>
    <v-main class="grey lighten-5">
    <router-view></router-view>
    </v-main>
    <v-footer v-show="getHeaderFooter">
      <Footer />
    </v-footer>
    <SnackBar/>
    <delete-dialog/>
          <Cart/>

  </v-app>
</template>

<script>
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import {mapGetters} from 'vuex';                                                  
import SnackBar from "./components/common/SnackBar.vue";
import DeleteDialog from './components/common/DeleteDialog.vue';
import Cart from './components/common/Cart.vue';

export default {
  name: "App",

  components: {
    Header,
    Footer,
    SnackBar,
    DeleteDialog,
    Cart
  },

  data:() => ({
    
  }),
  computed:{
    ...mapGetters('ui',['getHeaderFooter'])
  },
};
</script>
