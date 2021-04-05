<template>
<v-card flat class="my-5" >
  <v-data-table
    :headers="headers"
    :items="packages"
    sort-by="calories"
    class="elevation-0"
  >


     <template v-slot:item.updated_at="{ item }">
          {{ item.updated_at | moment("MMM D, YYYY") }}
        </template>

           <template v-slot:item.due_payment="{ item }">
          {{`${$helpers.formatMoney(item.due_payment)} ${item.currency}`}}
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

    <template v-slot:no-data>

    </template>
  </v-data-table>
</v-card>
</template>


<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      headers: [
        { text: 'Description', value: 'description' },
        { text: 'Store', value: 'store' },
        { text: 'Courier', value: 'courier' },
        { text: 'Courier #', value: 'courier_number' },
        { text: 'Weight (lbs)', value: 'weight' },
        { text: 'Tracking #', value: 'tracking_number' },
        { text: 'Status', value: 'status' },
        { text: 'Due amount', value: 'due_payment' },
      ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapGetters('user',['packages'])
    },

    methods: {
    },
  }
</script>
