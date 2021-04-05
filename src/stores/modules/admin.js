import Api from '../../apis/Api'
import Promise from 'promise'
export default {
    namespaced:true,
    state: () => ({
        pick_up_locations:[],
        status_types: [],
        us_addresses: [],
        users:[],
    }),
    mutations: {
        SET_USERS: (state, users) => {
            state.users = users;
        },
        REMOVE_USER: (state, id)=>{
            var index = state.users.findIndex(user => user.id == id)
            state.users.splice(index,1)
        },
        SET_PICKUP_LOCATIONS: (state, locations) => {
            state.pick_up_locations = locations;
        },
        SET_STATUS_TYPES: (state, status) => {
            state.status_types = status;
        },
           SET_US_ADDRESSES: (state, status) => {
            state.us_addresses = status;
        },
        UPDATE_LOCATION: (state, payload) => {
            var index = state.pick_up_locations.findIndex(location => location.id == payload.id);
            if (index!= -1) {
               state.pick_up_locations[index] = payload
            } else {
                state.pick_up_locations.push(payload);
            }
        },

       REMOVE_LOCATION: (state, id) => {
            var index = state.pick_up_locations.findIndex(location => location.id == id)
            state.pick_up_locations.splice(index,1)
        },
           UPDATE_PACKAGE_STATUS: (state, payload) => {
            var index = state.status_types.findIndex(status => status.id == payload.id);
            if (index!= -1) {
               state.status_types[index] = payload
            } else {
                state.status_types.push(payload);
            }
        },
        UPDATE_US_ADDRESS: (state, payload) => {
            var index = state.us_addresses.findIndex(status => status.id == payload.id);
            if (index!= -1) {
               state.us_addresses[index] = payload
            } else {
                state.us_addresses.push(payload);
            }
        },
               REMOVE_USADDRESS: (state, id) => {
            var index = state.us_addresses.findIndex(address => address.id == id)
            state.us_addresses.splice(index,1)
        },
    },
    getters: {
        users: (state) => {
            return state.users
        },
        settings: (state) => {
            return {
                "pick_ups": state.pick_up_locations,
                "status_types": state.status_types,
                "us_addresses":state.us_addresses
            }
        }
    },
    actions: {
        loadDashboard: async ({ dispatch}) => {
           return await Promise.all([
                dispatch('package/loadPackages', '', { root: true }),
                dispatch('preAlert/loadPreAlerts', '', { root: true }),
                dispatch('payment/loadPayments', '', { root: true }),
                dispatch('product/loadProducts', '', { root: true }),
                dispatch('loadSettings'),
                dispatch('fetchUsers'),
            ])
        },
        fetchUsers:async () => {
            return Api().get('/users/');
        },
        deleteUser: ({ commit },id) => {
            return new Promise((resolve, reject) => {
                Api().delete(`/user/delete/${id}`)
                    .then((res) => {
                        commit('REMOVE_USER', id)
                        resolve(res)
                }).catch((err)=> reject(err))
          })
        },

        loadSettings: async () => {
            return await Api().get('/settings');
        },
        saveLocation: ({ commit }, location) => {
            return new Promise((resolve, reject) => {
            Api().put('/settings/save_location', location)
            .then((res) => {
                commit('UPDATE_LOCATION', res.data)
                resolve(res);
            }).catch(err => reject(err))
            })

        },
        deleteLocation: ({ commit }, id) => {
            return new Promise((resolve, reject) => {
                Api().delete(`/settings/delete_location/${id}`)
                    .then((res) => {
                    commit('REMOVE_LOCATION', id)
                    resolve(res)
                    })
                    .catch(err => reject(err));
            })
        },
        saveAddress: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                Api().put('/settings/save_us_address', data)
                    .then((res) => {
                        commit('UPDATE_US_ADDRESS', res.data)
                        resolve(res);
                    })
                    .catch(err => reject(err));
            });
        },
        deleteUsAddress: ({commit}, id) => {
            return new Promise((resolve, reject) => {
                Api().delete(`/settings/delete_us_address/${id}`)
                    .then((res) => {
                        commit('REMOVE_USADDRESS', id)
                        resolve(res);
                    }).catch(err => reject(err));
            })
        },
        updatePackageStatus: ({ commit }, status) => {
            return new Promise((resolve, reject) => {
                Api().put('/settings/package_status', status)
                    .then((res) => {
                        commit('UPDATE_PACKAGE_STATUS', res.data);
                        resolve(res);
                    })
                    .catch(err => reject(err));
            });
        }
    }

}
