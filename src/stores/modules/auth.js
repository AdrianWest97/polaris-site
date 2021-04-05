import User from '../../apis/User'
import Promise from 'promise'
import Api from '../../apis/Api';
export default {
    namespaced:true,
    state: () =>  ({
            isLoggedIn: false,
            user: null
    }),
    mutations: {
        LOGIN: (state, status) => {
            state.isLoggedIn = status
        },
        AUTH_USER: (state, user) => {
            state.user = user;
        }
    },
    getters: {
        user: state => {
            return state.user
        },
        isLoggedIn: state => {
            return state.isLoggedIn
        }
    },
    actions: {
        login: ({ commit,dispatch }, data) => {
            return new Promise((resolve, reject) => {
                User.login(data)
                    .then((response) => {
                        commit('LOGIN', true);
                        localStorage.setItem('polaris-token', response.data);
                        dispatch('getUser');
                        resolve(response)
                    }).catch(err => {
                        reject(err);
                    })
            })
        },
       register: ({commit,dispatch},data) => {
            return new Promise((resolve, reject) => {
                User.register(data)
                    .then((response) => {
                         commit('LOGIN', true);
                        localStorage.setItem('polaris-token', response.data.token);
                        dispatch('getUser')
                        resolve(response)
                    }).catch(err => {
                        reject(err);
                    })
            })
        },
        checkVerified: () => {
            return new Promise((resolve, reject) => {
                User.auth()
                    .then((res) => {
                        res.data.email_verified_at ?
                            resolve(true)
                            : resolve(false)
                    }).catch(err => reject(err));
        })

    },
    sendVerifyResendRequest() {
      return Api().get("/email/resend");
        },

    async sendVerifyRequest({ dispatch }, hash) {
      await Api()
            .get("/email/verify/" + hash);
        dispatch("getUser");
        },
     sendPasswordResetRequest(_,email) {
       return Api().post('/password/email',email)
        },
        resetPassword(_, form) {
            return Api().post('password/reset/', form)
        },
        getUser: ({ dispatch,commit }) => {
            return new Promise((resolve, reject) => {
                User.auth()
                    .then((response) => {
                        //set if user is admin
                        localStorage.setItem('is_admin', response.data.is_admin)
                        commit('AUTH_USER', response.data)
                        commit('LOGIN',true)
                        resolve(response);
                    }).catch(err => {
                        reject(err);
                })
          })
        },
        logout: ({ commit }) => {
                User.logout()
                    .then((response) => {
                        if (response.status == 200) {
                       localStorage.removeItem('polaris-token');
                       localStorage.removeItem('is_admin');
                        commit('LOGIN', false)
                         resolve(response);
                        }
                    }).catch(err => {
                        //same action
                     commit('LOGIN', false)
                        localStorage.removeItem('polaris-token');
                         localStorage.removeItem('is_admin');
                })
        }
    }
}
