<template>
<v-card flat class="my-5">
  <v-data-table
    :headers="headers"
    :items="deliveries"
    sort-by="calories"
    class="elevation-0"
  >
     <template v-slot:item.updated_at="{ item }">
          {{ item.updated_at | moment("ddd, MMM D YYYY") }}
        </template>
           <template v-slot:item.due_payment="{ item }">
          {{`${$helpers.formatMoney(item.due_payment)} USD`}}
        </template>
          <template v-slot:item.status="{ item }">
         <v-chip
         small
         class="font-weight-bold"
         label
        :color="item.status.color"
      >
      {{item.status.status.toUpperCase()}}
         </v-chip>
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
        { text: 'Package #', value: 'package_number' },
        { text: 'Invoice #', value: 'payment.package_number' },
        { text: 'Shipper', value: 'courier' },
        { text: 'Description', value: 'description' },
        { text: 'Date', value: 'updated_at' },
      ],
      desserts: [],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapGetters('user',['deliveries'])
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
