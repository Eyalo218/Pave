import Vue from 'vue'
import Vuex from 'vuex'
import tripModule from './tripStore'
import markerModule from './markerStore'
import userModule from './userStore'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tripModule,
        markerModule,
        userModule
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
