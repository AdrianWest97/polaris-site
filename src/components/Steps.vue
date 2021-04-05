<template>
  <div class="block galleryBlock grey lighten-3">
    <v-container>
      <h2 class="text-center" color="white">How to get started</h2>
      <v-row>
        <v-col v-for="(item,index) in items" :key="index" class="d-flex child-flex" cols="12" sm="4">
              <v-card flat class="d-flex flex-column pa-5 justify-center">
                  <v-icon large>{{item.icon}}</v-icon>
                  <v-card-title class="text-center">{{item.title}}</v-card-title>
                  <v-card-subtitle>
                      {{item.description}}
                  </v-card-subtitle>
                  <h1></h1>
              </v-card>
        </v-col>
        <v-col cols="12" class="text-center">
          <div class="my-10">
          <v-btn 
          x-large 
          elevation="0"
           color="primary"
            class="font-weight-bold" 
            href="/register"
            outlined>
            Create your account
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Steps",
  data() {
    return {
      
    };
  },
  computed:{
    items(){
        return [
            {icon:'mdi-account-check-outline',title:'Create your account',description:'Create your account with us to receive your U.S address.'},
            {icon:'mdi-shopping-outline',title:'Shop Online',description:'Shop from any online store.'},
            {icon:'mdi-map-marker-path',title:'Track your package',description:'We will update your package in real time.'}
        ]
    }
  }
};
</script>