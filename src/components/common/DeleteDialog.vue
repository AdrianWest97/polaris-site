<template>
    <v-dialog
    :retain-focus="false"
    persistent
    :overlay-color="$store.state.ui.overlay_color"
     v-model="dialogDelete.visible" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="confirm()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
computed:{
...mapState('ui',['dialogDelete']),

},
methods:{
    ...mapActions('ui',['errorSnack','successSnack']),
    confirm(){
        var action = '';
        switch(this.dialogDelete.type){
         case 'delete_package':
             action = 'package/delete_package';
             break;
         case 'delete_payment':
             action = 'payment/deletePayment';
             break;
         case 'delete_user':
             action = 'admin/deleteUser';
             break;
         case 'delete_pre_alert':
             action = 'package/delete_prealert';
             break;
         case 'delete_product':
               action = 'product/delete_product';
               break;
           default:
               this.errorSnack("Unable to complete operation");
        }
               this.$store.dispatch(action,this.dialogDelete.id)
               .then(()=>{
                   this.successSnack("Item deleted");
                   this.close();
               })
                .catch((err)=>{
                  this.errorSnack(err)
             })
    },
    close(){
        this.$store.commit('ui/SET_DIALOG_DELETE',{
            id:null,
            visible:false,
            type:''
        })
    }
}
}
</script>

<style>

</style>