import Vue from 'vue'
import Vuex from 'vuex'
import tripModule from './tripStore'
import markerModule from './markerStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tripModule,
        markerModule
    },
    state: {
        users: [],
        reviews: []
    },
    mutations: {

    },
    actions: {}
})
