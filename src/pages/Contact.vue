<template>
      <v-container fill-height>
        <h1>Contact Us</h1>
        <v-row justify="space-between">
          <v-col cols="12" md="6">
          <p>For all enquiries, please leave a message using the form below, email or call us.</p>
          <p>Email: info@polaris.com</p>
          <p>Phone: 1876 847-48474</p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field  
           v-model="name" 
           :counter="10" 
           solo
           flat
           background-color="grey lighten-3"
           :rules="nameRules" 
           label="Name" required></v-text-field>
          <v-text-field
           v-model="email"
            :rules="emailRules" 
            label="E-mail"
            solo
           flat
           background-color="grey lighten-3"
             required></v-text-field>
          <v-textarea
           v-model="message"
            :rules="messageRules"
             label="Message"
             solo
           flat
           background-color="grey lighten-3"
              required
             ></v-textarea>
          <v-btn 
          :disabled="!valid" 
           color="primary"
           width="100%"
           depressed
           class="mr-4" @click="validate">Submit</v-btn>
        </v-form>
          </v-col>
              <v-col cols="12" md="6">
                    <div class="googlemap">
      <iframe width="100%" height="500" id="gmap_canvas" 
src="https://maps.google.com/maps?q=Brumella%20Town%20Center%20Mandeville%20manchester%20Jamaica&t=&z=13&ie=UTF8&iwloc=&output=embed" 
 title="location"></iframe>
    </div>
                 </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
  name: "Contact",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    message: "",
    messageRules: [
      v => !!v || "Message is required",
      v => (v && v.length >= 10) || "Message must be more than 10 characters"
    ],
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
      mounted(){
    this.$store.commit('ui/SET_HEADER_FOOTER',true)
  }
};
</script>