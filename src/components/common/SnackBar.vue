
<template>
    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      bottom
      app
      left
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          icon
          v-bind="attrs"
          @click="close()"
        >
          <v-icon>{{snackbar.icon}}</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
</template>
<script>
import {mapGetters } from 'vuex'
  export default {
  data:()=>({
  }),
  computed:{
      ...mapGetters('ui',['snackbar']),
  },

  methods:{
      close(){
          this.$store.dispatch('ui/hideSnackBar');
      }
  },
  }
</script>