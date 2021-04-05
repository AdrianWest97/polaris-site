<template>
  <v-navigation-drawer
    app
    :value="drawer"
    floating
    right
    stateless
    color="grey lighten-4"
    temporary
    width="400"
    scrollable
    :overlay-color="$store.state.ui.overlay_color"
  >
    <v-toolbar dense flat>
      <v-app-bar-nav-icon>
        <v-badge
          overlap
          :value="cart.length > 0"
          :content="cart.length"
          color="red"
        >
          <v-icon color="blue darken-4">mdi-shopping</v-icon>
        </v-badge>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Cart</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="$helpers.toggleCart()">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-virtual-scroll
      v-if="cart.length > 0"
      :items="cart"
      height="500"
      :bench="0"
      item-height="130"
    >
      <template v-slot:default="{ item }">
        <v-divider></v-divider>
        <cart-item :key="item.id" :item="item"></cart-item>
      </template>
    </v-virtual-scroll>

    <v-container fill-height v-if="cart.length == 0">
      <v-row justify="center">
        <v-col cols="12"> No items </v-col>
      </v-row>
    </v-container>
    <v-sheet color="white" class="pa-2" elevation="0" v-if="cart.length > 0">
      <div class="d-flex justify-space-between">
        <p class="grey--text font-weight-bold">SUB-TOTAL</p>
        <p class="font-weight-bold">{{ $helpers.formatMoney(total) }} USD</p>
      </div>
    </v-sheet>
    <v-sheet color="transparent" class="pa-5" v-if="cart.length > 0">
      <div class="d-flex flex-column justify-center">
        <v-btn
          rounded
          large
          @click="checkout()"
          depressed
          color="blue darken-4"
          class="white--text my-3 font-weight-bold"
          width="100%"
        >
          Checkout
        </v-btn>

        <v-dialog v-model="deleteDialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              rounded
              large
              depressed
              color="grey lighten-1"
              class="white--text font-weight-bold"
              width="100%"
              v-bind="attrs"
              v-on="on"
            >
              Empty Cart
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline"> Empty cart? </v-card-title>
            <v-card-text
              >Are you sure you want to remove all items from this
              cart?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="emptyCart()">
                Empty Cart
              </v-btn>
              <v-btn text color="primary" @click="deleteDialog = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CartItem from "../CartItem.vue";
export default {
  components: { CartItem },
  data: () => ({
    deleteDialog: false,
  }),
  computed: {
    ...mapState("cart", ["drawer"]),
    ...mapGetters({
      cart: "cart/getCart",
    }),
    total() {
      return this.cart.reduce((acc, val) => acc + val.total, 0);
    },
  },

  methods: {
    emptyCart() {
      this.$store.dispatch("cart/emptyCart").then(() => {
        this.$store.dispatch("ui/successSnack", "Cart emptied");
      });
      this.deleteDialog = false;
      this.$helpers.toggleCart();
    },
    checkout() {},
  },
};
</script>

<style>
</style>
