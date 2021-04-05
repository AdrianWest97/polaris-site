<template>
  <div class="block galleryBlock white">
    <v-container>
      <h2 class="text-center">Browse Our Products</h2>
      <v-row>
        <v-col v-for="item in items" :key="item.id" class="d-flex child-flex" cols="12" sm="4">
         <single-product :product="item"/>
        </v-col>
        <v-col cols="12" class="text-center">
          <div class="my-10">
          <v-btn
          x-large
          elevation="0"
           color="primary"
            class="font-weight-bold"
            to="/browse-products"
            outlined>
            Browse more
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SingleProduct from './SingleProduct.vue';
export default {
  components:{
  SingleProduct
  },
  name: "Gallery",
  data() {
    return {
    };
  },
  computed:{
    ...mapState('product',['products']),
    items(){
      return this.products.filter(item => item.is_featured && item.visible);
    }
  }
};
</script>
