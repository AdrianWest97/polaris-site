<template>
<div>
  <div class="block galleryBlock">
    <v-container>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
      :loading="!items"
      loading-text="Loading products..."
    >

    <template v-slot:header>
        <v-toolbar
          class="mb-1"
          flat
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

          <template v-slot:default="props">
         <v-row class="my-4">
        <v-col v-for="item in props.items" :key="item.id" class="d-flex child-flex" cols="6" sm="4">
         <single-product :product="item"/>
        </v-col>
         </v-row>
          </template>
      </v-data-iterator>
    </v-container>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import SingleProduct from '../components/SingleProduct.vue';
export default {
  components: { SingleProduct },
  name: "Gallery",
  data() {
    return {
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 20,
        sortBy: 'name',
          keys: [
          'Name',
          'category',
          'price',
        ],
    };
  },
  computed:{
   ...mapState('product',['products']),
   items(){
     return this.products.filter(item => item.visible)
   }
  },
   methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
    },
      mounted(){
    this.$store.commit('ui/SET_HEADER_FOOTER',true)
  }
};
</script>
