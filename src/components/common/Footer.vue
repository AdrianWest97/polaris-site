<template>
  <v-container>
    <v-footer padless>
      <v-row>
        <v-col cols="12">
      <v-card flat class="text-center">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
                    <strong>&copy;Polaris Dispatch
                    {{ new Date().getFullYear() }}
                    </strong>
        </v-card-text>
      </v-card>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    icons: [
      "fab fa-facebook",
      "fab fa-twitter",
      "fab fa-instagram"
    ]
  })
};
</script>