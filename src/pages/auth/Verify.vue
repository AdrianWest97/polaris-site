<template>
  <v-container fill-height>
   <v-alert
      v-if="error"
      dense
      text
      :type="error"
    >
    {{error}}
    </v-alert>
    <Loading v-show="!error"/>
  </v-container>
</template>

<script>
import {mapActions } from "vuex";
import Loading from '../../components/common/Loading'

export default {
  components:{Loading},
  props: ["hash"],
  data() {
    return {
      error: null
    };
  },

  mounted() {
    this.sendVerifyRequest(this.hash)
      .then(() => {
        this.$router.push("/");
      })
      .catch(error => {
        console.log(error.response);
        this.error = "Unable to process";
      });
  },
  methods: {
    ...mapActions("auth", ["sendVerifyRequest"])
  }
};
</script>
