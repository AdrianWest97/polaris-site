import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './stores/store'
import router from './router'
import helpers from './helpers'
Vue.use(require('vue-moment'));
import './scss/main.scss';
Vue.use({
  install() {
    Vue.helpers = helpers;
    Vue.prototype.$helpers = helpers;
  }
});
Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')


//if store is ready
if (store) {
  if (localStorage.getItem('polaris-token')) {
    store.dispatch(`auth/getUser`)
        .catch(() => {
          store.dispatch('auth/logout');
        })
  }
  // load products
  store.dispatch('product/loadProducts')
      .then((res) => {
      store.commit('product/SET_PRODUCTS',res.data.products)
  })

  //check cart items
   store.dispatch('cart/checkCartItems');
}
