import Promise from 'promise';
import Api from '../../apis/Api'
export default {
    namespaced:true,
    state: () =>  ({
        packages: [],
        statusTypes: [],
        newPackageDialog: {
            mode: 'add',
            item: null,
            visible: false,
        },
    }),
    mutations: {
        SET_PACKAGES: (state, payload) => {
            state.packages = payload
        },
        ADD_PACKAGE: (state, payload) => {
        state.packages.push(payload);
        },
        UPDATE_PACKAGE: (state, payload) => {
            var index = state.packages.findIndex(item => item.id == payload.id);
            state.packages.splice(index, 1, payload)
        },
        SET_NEW_PACKAGE_MODEL: (state, payload) => {
            state.newPackageDialog = {
                mode:payload.mode,
                item: payload.item,
                visible:payload.visible
            }
        },
        DELETE_PACKAGE: (state, id) => {
            var index = state.packages.findIndex(item => item.id == id)
            state.packages.splice(index,1)
        },
    },
    getters: {
        getPackages(state) {
            return state.packages
        },
    },
    actions: {
        loadPackages: async ({ commit }) => {
            return await Api().get('/package/')
        },
        delete_package: ({ commit }, id) => {
            return new Promise((resolve, reject) => {
                Api().delete(`/package/delete/${id}`)
                    .then((response) => {
                        commit('DELETE_PACKAGE', id)
                        resolve(response)
                    }).catch(err => reject(err))
            })
        },

        add_package: ({ commit,state }, item) => {
            return new Promise((resolve, reject) => {
                Api().put('/package/create/',item)
                    .then((res) => {
                        state.newPackageDialog.mode == 'add'
                ? commit('ADD_PACKAGE', res.data)
              : commit('UPDATE_PACKAGE', res.data);
                    resolve(res);
                    }).catch(err => {
                    reject(err);
                })
            })
        },
    }

}
