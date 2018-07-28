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
        currFilter: '',
        users: [],
        reviews: []
    },
    mutations: {
        setFilter(state, { searchedText }) {
            state.currFilter = searchedText;
        }
    },
    actions: {}
})
