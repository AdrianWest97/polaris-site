<template>
  <v-container>
    <v-toolbar flat class="mainHeader" dense>
      <v-toolbar-title >
        Polaris Dispatch </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/login" v-if="!isLoggedIn">Login</v-btn>
        <v-btn text to="/register" v-if="!isLoggedIn">Sign Up</v-btn>
        <!-- <v-btn text to="/about">About Us</v-btn> -->
        <v-btn text to="/our-rates">Rates</v-btn>
        <v-btn text to="/contact">Contact</v-btn>

  <v-menu offset-y v-if="user && isLoggedIn">
      <template v-slot:activator="{ on, attrs }">
     <v-chip
      class="ma-2"
      color="transparent"
      v-bind="attrs"
      v-on="on"
      label
    >
      <v-avatar left>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      {{user.fname}}
     <v-icon>mdi-chevron-down</v-icon>
    </v-chip>
      </template>
      <v-list>
        <v-list-item :to="user && user.is_admin ? '/dashboard' : '/manage'">
          <v-list-item-title>Dashbord</v-list-item-title>
        </v-list-item>
          <v-list-item  @click="logout()">
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

      </v-toolbar-items>
           <v-badge
                overlap
                v-if="user && !user.is_admin"
                color="red"
                :value="cart.length >0"
                :content="cart.length > 0
                 ?  cart.length : '0'"
                >
                <v-btn icon small  @click="$helpers.toggleCart()">
                <v-icon>mdi-cart-outline</v-icon>
                </v-btn>
               </v-badge>
      <div class="hidden-sm-and-up">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
          </template>
          <v-list class="responsiveMenu">
            <v-list-item >
              <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!isLoggedIn">
              <v-list-item-title><router-link to="/Login">Login</router-link></v-list-item-title>
            </v-list-item>
                      <v-list-item v-if="!isLoggedIn">
              <v-list-item-title><router-link to="/Sign Up">Sign Up</router-link></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><router-link to="/about">About Us</router-link></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><router-link to="/contact">Contact</router-link></v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isLoggedIn">
              <v-list-item-title><router-link :to="user && user.is_admin ? '/dashboard' : '/manage'">Dashboard</router-link></v-list-item-title>
            </v-list-item>
          <v-list-item v-if="isLoggedIn">
              <v-list-item-title><router-link @click="logout()">Logout</router-link></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Header",
  data: () => ({
  }),
  computed:{
    ...mapGetters({
      user:'auth/user',
      isLoggedIn:'auth/isLoggedIn',
      cart:'cart/getCart'
    })
  },

  methods:{

    logout(){
      this.$store.dispatch("auth/logout")
      .then(()=>{
       if(this.$route.path != '/'){
         this.$router.push({path:'/'})
       }
      })
    },
  }
};
</script>
