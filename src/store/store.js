import Vue from 'vue'
import Vuex from 'vuex'
import stripModule from './tripStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        stripModule,
    },
    state: {
        users: [],
        reviews: []
    },
    mutations: {

    },
    actions: {}
})
