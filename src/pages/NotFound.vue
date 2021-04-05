<template>
    <v-container>
      <div class="block text-center notFound">
        <h2>Page not found</h2>
        <em class="fas fa-exclamation-triangle red--text"></em>
        <p>We're sorry, the page you requested could not be found. Please go back to the homepage or contact us at admin@bibekshakya.com</p>
      </div>
    </v-container>
</template>

<script>
export default {
  name: "NotFound",

  data() {
    return {
      items: []
    };
  },
  created(){
        this.$store.commit('ui/SET_HEADER_FOOTER',true)
  }
};
</script>