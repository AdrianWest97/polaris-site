<template>
  <div class="packages my-5">
    <h1 class="subheading grey--text ">Payments</h1>
    <div  class=" container-fluid">
<v-card flat class="my-5">
  <v-data-table
    :headers="headers"
    :items="payments"
    sort-by="invoice_number"
    class="elevation-0"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
                <v-btn :disabled="payments.length < 1" outlined large class="font-weight-bold">Export<v-icon>mdi-download</v-icon></v-btn>
      </v-toolbar>
    </template>
     <template v-slot:item.updated_at="{ item }">
          {{ item.updated_at | moment("MMM D, YYYY") }}
        </template>
          <template v-slot:item.user="{ item }">
          {{`${item.package.user.fname} ${item.package.user.lname}`}}
        </template>

           <template v-slot:item.amount="{ item }">
          {{`${$helpers.formatMoney(item.amount)} ${item.currency}`}}
        </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="deleteItem(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      No Payments
    </template>
  </v-data-table>
</v-card>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

  export default {
    data: () => ({
    loading:false,
      dialog: false,
      headers: [
        { text: 'Date', value: 'updated_at' },
        { text: 'Invoice', value: 'invoice_number' },
        { text: 'Account', value: 'user' },
        { text: 'Package #', value: 'package.package_number' },
        { text: 'Method', value: 'method' },
        { text: 'Amount', value: 'amount' },
        { text: 'Action', value: 'actions', sortable: false },
      ],
    }),

    computed: {
      ...mapGetters('payment',['payments'])
    },

    methods: {
        deleteItem (id) {
         this.$store.commit('ui/SET_DIALOG_DELETE',{
        visible:true,
        type:'delete_payment',
        id:id
      })
      },

    },
  }
</script>

