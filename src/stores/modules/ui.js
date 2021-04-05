export default {
    namespaced: true,
    state: () => ({
        HeaderFooterDisplay: false,
        overlay_color:'#8c95a6',
        sideBar: {
            drawer: true
        },
        dialogDelete: {
            visible: false,
            id: null,
            type: ''
        },
        snackabr: {
            visible: false,
            text: '',
            color: '',
            icon:'mdi-close-circle'
        },
       parishes:[
        "Hanover",
        "St. Elizabeth",
        "St. James",
        "Trelawny",
        "Westmoreland",
        "Clarendon",
        "Manchester",
        "St. Ann",
        "St. Catherine",
        "St. Mary",
        "Kingston",
        "Portland",
        "St. Andrew",
        "St. Thomas"
    ],
    }),
    mutations: {
        SET_HEADER_FOOTER: (state, display) => {
            state.HeaderFooterDisplay = display
        },
        SET_SIDEBAR_DRAWER: (state) => {
            state.sideBar = {
                drawer: !state.sideBar.drawer
            }
        },
        SET_DIALOG_DELETE: (state, payload) => {
            state.dialogDelete = {
                visible: payload.visible,
                id: payload.id,
                type: payload.type
            }
        },
        SET_SNACKBAR: (state, payload) => {
            state.snackabr = {
                visible: payload.visible,
                color: payload.color,
                text: payload.text,
                icon:payload.icon
            }
        },
        HIDE_SNACKBAR: (state) => {
            state.snackabr = {
                visible: false,
                color: '',
                text: '',
                icon:'mdi-close-circle'
            }

        }
    },
    getters: {
        getHeaderFooter(state) {
            return state.HeaderFooterDisplay
        },
        sidebar(state) {
            return state.sideBar
        },
        snackbar(state) {
            return state.snackabr
        }
    },
    actions: {
        showSnackBar: ({ commit }, data) => {
            commit('SET_SNACKBAR', data);
            setTimeout(() => {
                commit('HIDE_SNACKBAR')
            }, 3000);
        },
        hideSnackBar: ({ commit }) => {
            commit('SET_SNACKBAR', {
                visible: false,
                text: '',
                color: '',
                icon:'mdi-close-circle'
            })
        },
        successSnack: ({dispatch}, message) => {
             dispatch('showSnackBar',{
                visible: true,
                text: message,
                 color: 'success',
                icon:'mdi-checkbox-marked-circle-outline'

            })
        },
        errorSnack: ({dispatch}, message) => {
             dispatch('showSnackBar',{
                visible: true,
                text: message,
                 color: 'error',
                 icon:'mdi-information-outline'

            })
        }
    }
}
