<template>
         <v-card class="pa-3"  outlined tile>
            <v-img
            :src="product.use_url ? product.image_url : $helpers.loadImage(product.image.original)"
            contain
            aspect-ratio="1">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-card-title><router-link class="routerLink"  :to="`/details/${product.id}`">{{product.name.length > 18 ? `${product.name.substring(0,15)}...` : product.name}}</router-link></v-card-title>
            <v-card-subtitle>
              <strong>{{$helpers.formatMoney(product.price)}} USD</strong>
            </v-card-subtitle>

          </v-card>
</template>

<script>
export default {
methods:{
},
props:{
    product:{
        required:true,
        type:Object
    }
}
}
</script>

<style lang="scss" scoped>
.routerLink{
     text-decoration: none;
     color: #000;
     font-weight: 700
 }
 .routerLink:hover{
     text-decoration:underline
 }
</style>
