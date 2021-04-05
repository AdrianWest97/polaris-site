import axios from "axios";
import store from '../stores/store'
import router from "../router";


let BaseApi = axios.create({
    baseURL:"http://127.0.0.1:8000/api"
});
BaseApi.interceptors.response.use(
  response => response,
  error => {
  if (error.response.status === 401) {
      store.commit('LOGIN', false)
      store.commit("AUTH_USER", null);
    localStorage.removeItem("polaris-token");
    window.sessionStorage.clear();
     if(router.currentRoute.path !== '/'){
          router.push('/')
        }
    } else {
      return Promise.reject(error);
    }
  }
);


let Api = function() {
  let token = localStorage.getItem("polaris-token");
  if (token) {
    BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return BaseApi;
};
export default Api;
