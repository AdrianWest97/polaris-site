<template>
  <div class="products my-5">
    <h1 class="subheading grey--text ">Products</h1>
    <div  class="container-fluid">
   <v-card flat class="my-5" dense>
      <v-data-table
    :headers="headers"
    :items="products"
    class="elevation-0"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
          <v-btn-toggle
          >
        <v-btn outlined @click="openDialog()" class="font-weight-bold">Add Products<v-icon>mdi-plus</v-icon></v-btn>
       <v-btn :disabled="products.length < 1" outlined class="font-weight-bold">Export <v-icon>mdi-download</v-icon></v-btn>
          </v-btn-toggle>
      </v-toolbar>
    </template>

    <template v-slot:item.visible="{item}">
        <v-switch
        inset
        dense
        :disabled="item.stock < 1"
        color="success"
        :input-value="item.visible"
        @change="setVisibility(item.id)"
        >
        </v-switch>
    </template>


       <template v-slot:item.is_featured="{item}">
        <v-switch
        inset
        dense
        :disabled="item.stock < 1"
        color="success"
        :input-value="item.is_featured"
        @change="setFeatured(item.id)"
        >
        </v-switch>
    </template>

    <template v-slot:item.price="{item}">
     {{$helpers.formatMoney(item.price)}}
    </template>

    <template v-slot:item.stock="{item}">
       <span class="stock" v-if="item.stock > 0">In stock</span>
       <span class="out" v-else>Out of stock</span>
     ({{item.stock}})
    </template>
    <template v-slot:item.image="{item}">
  <div class="d-inline-flex justify-center align-center">
      <v-img
      :src="item.use_url? item.image_url : $helpers.loadImage(item.image.thumbnail)"
      contain
      @error="this.src = 'https://gadgetworld254.co.ke/wp-content/uploads/2020/12/1607111529_Apple-iPhone-X-White.jpg'"
      height="50"
      width="50"
      rounded
      :aspect-ratio="1"
      >
        <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey" :size="20"></v-progress-circular>
                </v-row>
       </template>
      </v-img>
        <span class="font-weight-bold mx-3">{{item.name.length > 20 ? `${item.name.substring(0,20)}...` : item.name }}</span>
  </div>
    </template>

     <template v-slot:item.caption="{item}">
        <span >{{item.caption.length > 50 ? `${item.caption.substring(0,50)}...` : item.name }}</span>
    </template>

    <template v-slot:item.actions="{ item }">
     <v-btn icon @click="editItem(item)">
       <v-icon>mdi-pencil</v-icon>
     </v-btn>
       <v-btn icon @click="deleteItem(item.id)">
       <v-icon>mdi-delete</v-icon>
     </v-btn>
     </template>

    <template v-slot:no-data>
        No Products available
    </template>
  </v-data-table>
   </v-card>
</div>
<ProductDialog/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState } from 'vuex'
import ProductDialog from '../admin/ProductDialog'
export default {
  components:{
    ProductDialog
  },
  data:() => ({
    headers:[
        { text: 'Item', value: 'image'},
        { text: 'Category', value: 'category.name' },
        { text: 'Caption', value: 'caption' },
        { text: 'C/U (USD)', value: 'price' },
        { text: 'Stock', value: 'stock' },
        { text: 'Available', value: 'visible' },
        { text: 'Featured', value: 'is_featured' },
        { text: 'Actions', value: 'actions' },
      ]
  }),
  computed:{
    ...mapGetters('product',['products']),
    ...mapState('product',['newProductDialog']),

  },
   methods:{
     ...mapActions('product',['setVisibility','setFeatured']),
         openDialog(){
        this.$store.commit('product/SET_NEW_PRODUCT_MODEL',{
          visible:true,
          package:null,
          mode:'add'
        })
      },
       editItem(item){
          this.$store.commit('product/SET_NEW_PRODUCT_MODEL',{
          visible:true,
          mode:'edit',
          item:item,
        })
      },
      deleteItem (id) {
      this.$store.commit('ui/SET_DIALOG_DELETE',{
        visible:true,
        type:'delete_product',
        id:id
      })
      },
   },
}
</script>
<style scoped lang="scss">
.stock{
  color:rgb(110, 179, 19);
  font-weight: bolder;
}
.out{
  color:rgb(231, 3, 3);
  font-weight: bolder;
}
</style>
