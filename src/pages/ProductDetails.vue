<template>
  <v-container fill-height>
     <v-row align="center" color="transparent" justify="center">
  <v-col cols="12">
    <v-card outlined color="transparent" class="pa-5" v-if="product">
    <div class="row">
        <v-col cols="12" md="4">
            <v-img
            :src="product.use_url ? product.image_url : $helpers.loadImage(product.image.original)"
              max-width="800" center contain aspect-ratio="1">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
        </v-col>
             <v-col cols="12" md="8" class="my-lg-9">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline"><strong>{{product.name}}</strong></v-list-item-title>
        <v-list-item-subtitle>
          <h2 class="font-weight-bold">{{$helpers.formatMoney(product.price)}} USD</h2>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
        <div class="mx-5">
            <p>{{product.description}}</p>
          </div>

          <div v-if="user && !user.is_admin" class="d-flex flex-column mx-5 align-start justify-start">
            Instock: {{product.stock}}
             <div class="qty my-5" v-if="product.stock > 0">
                  <v-btn
                   @click="quantity--"
                   tile color='blue darken-3'
                    :disabled="quantity <= 1"
                    depressed >&minus;</v-btn>
                  <input
                   type="number"
                    name="qty"
                    readonly
                     class="" v-model="quantity">
                  <v-btn
                  @click="quantity++" tile
                  depressed
                  :disabled="disabled"
                   color='blue darken-3'>&plus;</v-btn>
              </div>
                       <div  class="my-5 font-weight-bold" style="color:red" v-else>
                         This product is out of stock
                       </div>
              <v-btn
              :disabled="product.stock < 1"
              class="pa-5" x-large
              outlined
              @click="add_to_cart()"
              color="blue darken-3">
                Add to cart
                </v-btn>
          </div>


    </v-col>
      </div>
     </v-card>
        </v-col>
     </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
   data:() => ({
      quantity:1
    }),
  methods:{
      //Add product to cart
          add_to_cart(){
      var item = {
        id:this.product.id,
        quantity:this.quantity,
        initial_cost:this.product.price,
        total:0
      };
      this.$store.dispatch('cart/addToCart',item)
      .then(()=>{
        this.$store.dispatch('ui/successSnack','Item added to cart')
      })
    },
  },
    mounted(){
    this.$store.commit('ui/SET_HEADER_FOOTER',true)
  },
computed:{
...mapState('product',['products']),
...mapGetters('auth',['user']),
disabled(){
  return this.quantity == this.product.stock
},
product(){
    return this.products.find(item => item.id == this.$route.params.id)
}
},
props:['id'],
}
</script>

<style lang="scss" scoped>



.qty {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	text-align: center;
  border: 1px solid grey !important;
  padding: 2px;
  border-radius: 3px;

	label {
		flex: 1 0 100%;
	}
	input {
		width: 7rem;
		font-size: 1.3rem;
		text-align: center;

	}
	button {
		width: 3rem; height: 3rem;
		color: #fff;
		font-size: 2rem;
	}
	// button.qtyminus {
	// 	margin-right: 0.3rem;
	// }
	// button.qtyplus {
	// 	margin-left: 0.3rem;
	// }
}


</style>
