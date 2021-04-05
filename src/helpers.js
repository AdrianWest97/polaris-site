import store from './stores/store'
const helpers = {
 kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
},
     formatMoney(value) {
        return Intl.NumberFormat('en-US', {
            'style': 'currency',
            currency: 'USD'
        }).format(value);
    },

    //load image
         loadImage(src){
     console.log(src);
       return `http://localhost:8000${src}`
    },

    toggleCart(){
         store.commit('cart/TOGGLE_DRAWER');
    },

 }

export default helpers;

