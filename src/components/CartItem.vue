<template>
    <v-card v-show="isAvailable()"  v-if="product != null" flat tile color="transparent">
    <v-card-text>
    <div class="d-flex flex-row">
    <v-badge
    overlap
    left
    icon="mdi-close"
    @click.native="removeItem()"
    color="grey lighten-1"
    >
      <v-img
      width="80"
      height="80"
      center
      contain
      aspect-ratio="1"
      :src='product.use_url ? product.image_url :
      $helpers.loadImage(product.image.original)'
      >
      <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
    </v-img>
    </v-badge>
     <v-list class="pa-0">
        <v-list-item three-line>
           <v-list-item-content>
            <v-list-item-title><span class="grey--text font-weight-bold">{{product.category.name}}</span></v-list-item-title>
            <v-list-item-subtitle class="link" @click="loadProduct()"><span class="font-weight-bold">{{item.quantity}} x {{product.name.length > 25 ? `${product.name.substring(0,22)}...` : product.name}}</span></v-list-item-subtitle>
            <v-list-item-subtitle><span class="cost">{{$helpers.formatMoney(item.total)}} USD</span></v-list-item-subtitle>
           </v-list-item-content>
        </v-list-item>
     </v-list>
    </div>
    </v-card-text>
    </v-card>

</template>

<script>
import Api from '../apis/Api'
export default {
data:() => ({
product:null
}),
computed:{
},
created(){
this.getProduct();
},
methods:{
    isAvailable(){
        if(this.product.visible){
            return true
        }else{
            this.removeItem();
        }
        return false;
    },
      removeItem(){
          this.$store.dispatch("cart/removeItem",this.item)
      },
        getProduct(){
        Api().get(`/products/${this.item.id}`)
        .then((res) => {
            if(res.data.visible && res.data.stock > 0){
                this.product = res.data;
            }else{
                this.removeItem(this.item)
            }
        }).catch(err => console.log(err));
    },
      loadProduct(){
          var check = this.$route.path == `/details/${this.product.id}`;
          if(!check){
            this.$router.push({path: `/details/${this.product.id}`})
          }
          this.$helpers.toggleCart();
      }
},
props:{
    item:{
        required:true,
        type:Object
    }
}
}
</script>

<style scoped lang="scss">
.border-bottom{
border-bottom: 1px solid rgb(156, 151, 151)
}
.cost{
    font-weight: bold;
    color: rgb(51, 51, 218);
}
.link{
    :hover{
        color: #000 !important;
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>
