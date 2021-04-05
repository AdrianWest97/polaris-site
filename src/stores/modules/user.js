import User from '../../apis/User'
import Api from '../../apis/Api'

export default {
    namespaced:true,
    state: () => ({
        packages: [],
        preAlerts: [],
        purchases: [],
        invoices:[],
    }),

    mutations: {
        SET_PACKAGES: (state, payload) => {
            state.packages = payload;
        },
        SET_PRE_ALERTS: (state, payload) => {
              state.preAlerts = payload;
        },
            SET_INVOICES: (state, payload) => {
              state.invoices = payload;
        },
        ADD_PREALERT: (state, item) => {
        state.preAlerts.push(item);
        },
        UPDATE_PREALERT: (state,payload) => {
         var index = state.preAlerts.findIndex(item => item.id == payload.id);
             state.preAlerts.splice(index,1,payload)
        },
    },

        getters: {
        packages(state) {
            return state.packages
            },
            deliveries: (state)=>{
            return state.packages.filter(item => item.status.status.toLowerCase() == 'delivered')
        },
        preAlerts(state) {
            return state.preAlerts
            },
            payments(state) {
            return state.invoices
        }
    },
        
    actions: {
        loadPackagesPayments: ({commit}) => {
           return new Promise((resolve, reject) => {
                User.activity()
                    .then((res) => {
                        commit('SET_PACKAGES',res.data.packages)
                        commit('SET_PRE_ALERTS', res.data.pre_alerts);
                        commit('SET_INVOICES', res.data.payments);
                        resolve(res);
                    }).catch((err) => reject(err));
            })

            },
          
               addPreAlert: ({ commit }, item) => {
               return new Promise((resolve, reject) => {
                Api().put('/pre_alerts/create',item)
                    .then((res) => {
                        item.mode == 'add' ? commit('ADD_PREALERT', res.data)
                            : commit('UPDATE_PREALERT',res.data);
                        resolve(res);
                    }).catch(err => reject(err))
            })
        },

              
  }
}
