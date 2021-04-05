<template>
     <v-app-bar flat app>
      <v-app-bar-nav-icon  @click="toggleSideBar()"></v-app-bar-nav-icon>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
    </v-app-bar>
</template>

<script>
export default {
methods:{
  toggleSideBar(){
    this.$store.commit('ui/SET_SIDEBAR_DRAWER',)
  }
}
}
</script>

<style>

</style>
