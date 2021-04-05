import Api from '../../apis/Api'
export default {
    namespaced: true,
    state: () => ({
        pre_alerts: [],
         newPreAlertDialog: {
            mode: 'add',
            item: null,
            visible:false
        },
    }),
    mutations: {
        SET_PRE_ALERTS: (state, payload) => {
            state.pre_alerts = payload;
        },
        ADD_PRE_ALERT: (state, payload) => {
        state.pre_alerts.push(payload);
        },
        UPDATE_PRE_ALERT: (state, payload) => {
            var index = state.packages.findIndex(item => item.id == payload.id);
             state.pre_alerts.splice(index,1,payload)
        },
        SET_NEW_PRE_ALERT_MODEL: (state, payload) => {
            state.newPreAlertDialog = {
                mode:payload.mode,
                item: payload.item,
                visible:payload.visible
            }
        },
        DELETE_PRE_ALERT: (state, id) => {
            var index = state.pre_alerts.findIndex(item => item.id == id)
            state.pre_alerts.splice(index,1)
        },
    },
    getters: {
        preAlerts(state) {
            return state.pre_alerts
        },
    },

    actions: {
        loadPreAlerts: async () => {
            return await Api().get('/pre_alerts/');
        },
        delete_pre_alert: ({ commit }, id) => {
            return new Promise((resolve, reject) => {
                Api().delete(`/pre_alert/delete/${id}`)
                    .then((response) => {
                        commit('DELETE_PRE_ALERT', id)
                        resolve(response)
                    }).catch(err => reject(err))
            })
        },

        add_pre_alert: ({ commit }, item) => {
            return new Promise((resolve, reject) => {
                Api().put(`/pre_alert/create/${item.id}`,item.form)
                    .then((res) => {
                        item.form.mode == 'add' ? commit('ADD_PRE_ALERT', res.data)
                            : commit('UPDATE_PRE_ALERT', res.data);
                    resolve(res);
                }).catch(err =>{
                    reject(err);
                })
            })
        },


        update_pre_alert: ({ commit }, id) => {
            return new Promise((resolve, reject) => {
                Api().put(`/pre_alerts/update/${id}`)
                    .then((res) => {
                        commit('UPDATE_PREALERT', res.data);
                        resolve(res)
                    }).catch(err => reject(err));
            })
        }
    }
}
