import Promise from "promise";
import Api from "../../apis/Api";

let initial_cart = localStorage.getItem('cart');
export default {
    namespaced: true,
    state: () => ({
        drawer: false,
        cart: initial_cart ?
        JSON.parse(initial_cart) : [],
    }),

    mutations: {
        TOGGLE_DRAWER: (state) => {
            state.drawer = state.drawer ? false : true
        },
        ADD_TO_CART: (state, item) => {
            var product = state.cart.find((x) => x.id == item.id)
            //increment the quantity and increase cost
            if (product) {
                product.quantity++;
                product.total = product.quantity * product.initial_cost;
            } else {
                //add new item
                item.total = item.quantity * item.initial_cost;
                state.cart.push(item);
            }
             //update local storage
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },

        REMOVE_ITEM: (state, payload) => {
            state.cart = state.cart.filter(item => item.id != payload.id);
             localStorage.setItem('cart',JSON.stringify(state.cart))
        },

        EMPTY_CART: (state) => {
            state.cart = [];
             localStorage.setItem('cart',JSON.stringify(state.cart))
        }

    },

    getters: {
        getCart: (state) => {
            return state.cart;
        }
    },


    actions: {
        item_exits: (_,id) => {
            return new Promise((resolve, reject) => {
                Api().get(`products/${id}`)
                    .then((res) => {
                        if (res.data) {
                            resolve(res);
                        }
                    }).catch(err => reject(err));
           })
        },
        addToCart: ({ commit }, item) => {
            commit('ADD_TO_CART', item);
        },
        removeItem({ commit }, item) {
            commit('REMOVE_ITEM',item)
        },
        emptyCart: ({ commit }) => {
            commit('EMPTY_CART')
        },
        checkCartItems({ state, dispatch}){
       state.cart.forEach(element => {
           dispatch('item_exits',element.id)
            .catch((err) => {
                dispatch('removeItem',element)
            })
           });
   },

    }
}
