import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usrinfo: {},
        griddata: [],
    },
    mutations: {
        storeusrinfo(state, val) {
            state.usrinfo = val
        },
        updategrid(state, val) {
            state.griddata = val
        }
    },
    actions: {},
    modules: {}
})