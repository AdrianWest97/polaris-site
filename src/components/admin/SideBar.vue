<template>
    <v-navigation-drawer
      app
      :value="sidebar.drawer"
    >
    <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"

        ></v-avatar>

        <div>Hey, Welcome Back</div>
      </v-sheet>
      <v-divider></v-divider>
          <v-list :disabled="loading">
        <v-list-item
          v-for="[icon, text, to] in links"
          :key="icon"
          link
          :to="to"
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data:()=>({
    links: [
        ['mdi-package-variant', 'Packages', '/dashboard/packages'],
        ['mdi-bell-ring-outline', 'Pre alerts', '/dashboard/pre_alerts'],
        ['mdi-shopping', 'Products', '/dashboard/products'],
        ['mdi-cash-USD', 'Payments', '/dashboard/payments'],
        ['mdi-account-multiple-outline', 'Users','/dashboard/users'],
        ['fas fa-cog', 'Settings','/dashboard/settings'],
      ],
  }),
  computed:{
  ...mapGetters('ui',['sidebar'])
  },
  props:['loading']
}
</script>

<style>

</style>
