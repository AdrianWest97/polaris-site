<template>
  <v-container fill-height>
      <v-row justify="center" align="center">
          <v-col cols="12" md="8">
             <v-card flat class="my-5" >
                <v-data-table
                :headers="headers"
                :items="orders"
                 class="elevation-1"
            >
            <template v-slot:item.total="{item}">
                {{$helpers.formatMoney(item.total)}}
            </template>
                <template v-slot:item.name="{item}">
                {{item.name}} x {{item.quantity}}
            </template>
            <template v-slot:body.append>
        <tr>
          <td></td>
          <td class="font-weight-bold">
            Order Total: {{$helpers.formatMoney(orderTotal)}} USD
          </td>
          <td colspan="4"></td>
        </tr>
      </template>
            </v-data-table>
              </v-card>
          </v-col>
          <v-col cols="12" md="4">

          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    mounted(){
    setTimeout(()=>{
     this.buildOrder();
    },1000)
    this.$store.commit('ui/SET_HEADER_FOOTER',true)
  },
  data:() => ({
      orders:[],
      headers:[
          {text:'product',value:'name'},
          {text:'Total',value:'total'},
      ]
  }),
  computed:{
      ...mapGetters({
          cart:'cart/getCart',
          products:'product/products'
      }),
      orderTotal(){
          return this.orders.reduce((acc,val) => acc + val.total,0)
      }
  },
      methods:{
          buildOrder(){

              this.cart.forEach(element => {
              var item = this.products.find(x=> x.id == element.id);
              if(item){
              this.orders.push({
                  name:item.name,
                  id:item.id,
                  quantity:element.quantity,
                  total:element.total
              });
              console.log(this.orders)
              }
          });
          }
      },
  }

</script>

<style>

</style>
