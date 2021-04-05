import Promise from 'promise';
import Api from '../../apis/Api'
export default {
    namespaced:true,
        state: () =>  ({
        products: [],
        categories: [],
        newProductDialog: {
            mode: 'add',
            item: null,
            visible: false,
        },
    }),

    mutations: {
        SET_PRODUCTS: (state, payload) => {
            state.products = payload
        },
        ADD_PRODUCT: (state, payload) => {
        state.products.push(payload);
        },
        UPDATE_PRODUCT: (state, payload) => {
            var index = state.products.findIndex(item => item.id == payload.id);
             state.products.splice(index,1,payload)
        },
        SET_NEW_PRODUCT_MODEL: (state, payload) => {
            state.newProductDialog = {
                mode:payload.mode,
                item: payload.item,
                visible:payload.visible
            }
        },
        DELETE_PRODUCT: (state, id) => {
            var index = state.products.findIndex(item => item.id == id)
            state.products.splice(index,1)
        },
        SET_CATEGORIES: (state, categories) => {
            state.categories = categories;
        },
    },
    getters: {
        products: (state) => {
        return state.products
      }
    },
    actions: {
    loadProducts: async ({ commit }) => {
            return await Api().get('/products/');
        },

        saveProduct: ({ commit,state }, form) => {
            return new Promise((resolve, reject) => {
                Api().post('/products/store/',form)
                    .then((res) => {
                        state.newProductDialog.mode == 'edit'
                            ? commit('UPDATE_PRODUCT', res.data)
                            : commit('ADD_PRODUCT',res.data)
                        resolve(res);
                    }).catch(err => reject(err));
            })
        },
        setVisibility:({commit,dispatch}, id) => {
            Api().put('/products/set_visibility', { id: id })
                .then((res) => {
                    commit('UPDATE_PRODUCT', res.data);
                    dispatch('ui/successSnack','Product upadted successgully!',{root:true});
                }).catch(err => {
             dispatch('ui/errorSnack',err,{root:true});
            })

        },
        setFeatured: ({commit,dispatch}, id) => {
            Api().put('/products/set_featured', { id: id })
            .then((res) => {
                commit('UPDATE_PRODUCT', res.data);
                dispatch('ui/successSnack','Product added to featured',{root:true});
            }).catch((err) => {
             dispatch('ui/errorSnack',err,{root:true});
            })
        },
          delete_product: ({ commit }, id) => {
            return new Promise((resolve, reject) => {
                Api().delete(`/products/delete/${id}`)
                    .then((response) => {
                        commit('DELETE_PRODUCT', id)
                        resolve(response)
                    }).catch(err => reject(err))
            })
        },
    }
}
