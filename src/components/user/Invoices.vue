<template>
<v-card flat class="my-5">
  <v-data-table
    :headers="headers"
    :items="payments"
    sort-by="calories"
    class="elevation-0"
  >
     <template v-slot:item.updated_at="{ item }">
          {{ item.updated_at | moment("MMM D, YYYY") }}
        </template>
           <template v-slot:item.amount="{ item }">
          {{`${$helpers.formatMoney(item.amount)} ${item.currency}`}}
        </template>
        

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      
    </template>
  </v-data-table>
</v-card>
</template>


<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Invoice #', value: 'invoice_number' },
        { text: 'Method', value: 'method' },
        { text: 'Amount', value: 'amount' },
        { text: 'Date', value: 'updated_at' },
      ],
      desserts: [],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapGetters('user',['payments'])
    },

    methods: {
      editItem (item) {
       console.log(item)
      },

      deleteItem (item) {
    console.log(item)
      },

 

      close () {
     
      },


      save () {
        
      },
    },
  }
</script>