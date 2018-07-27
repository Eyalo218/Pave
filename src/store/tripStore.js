import Vue from 'vue'
import Vuex from 'vuex'

import tripService from '../service/tripService.js'

export default {
    state: {
        trips: [],
        currTrip: null
    },
    mutations: {
        loadTrips(state, { trips }) {
            state.trips = trips
        },
        setCurrTrip(state, { trip }) {
            state.currTrip = trip
        }
    },
    getters: {
        tripsForDisplay(state) {
            return state.trips
        },
    },
    actions: {
        loadTrips(context) {
            tripService.query()
                .then(trips => context.commit({ type: 'loadTrips', trips }))
        },
        setCurrTrip(context, { currTripId }) {
            return tripService.getById(currTripId)
                .then(trip =>
                    context.commit({ type: 'setCurrTrip', trip }))
        }
    }
}
