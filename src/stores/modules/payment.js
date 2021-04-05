import Api from "../../apis/Api";

export default {
    namespaced: true,
    state: () => ({
        payments: [],
        newPaymentDialog: {
            mode: 'add',
            item: null,
            visible: false,
        }
    }),
    mutations: {
        SET_PAYMENTS: (state, payments) => {
            state.payments = payments;
        },
        SET_NEW_PAYMENT_DIALOG: (state, payload) => {
            state.newPaymentDialog = payload;
        },
        ADD_PAYMENT: (state, payment) => {
            state.payments.push(payment);
        },
         DELETE_PAYMENT: (state, id) => {
              var index = state.payments.findIndex(item => item.id == id)
            state.payments.splice(index,1)
        }
    },
    getters: {
        payments: (state) => {
            return state.payments
        }
    },
    actions: {
        loadPayments: async () => {
          return await Api().get('/payments/')
        },

        addPayement: ({ commit }, payment) => {
            return new Promise((resolve, reject) => {
                Api().put('/payments/create', payment)
                    .then((res) => {
                        commit('ADD_PAYMENT', res.data);
                        resolve(res);
                    }).catch(err => reject(err))
            })

        },
             deletePayment: ({ commit }, id) => {
            return new Promise((resolve, reject) => {
                Api().delete(`/payments/delete/${id}`)
                    .then((response) => {
                        commit('DELETE_PAYMENT', id)
                        resolve(response)
                    }).catch(err => reject(err))
            })
        },
    }
}
