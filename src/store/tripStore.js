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
            // console.log(trips);
            state.trips = trips
        },
        setCurrTrip(state, { trip }) {
            state.currTrip = trip
        }
    },
    getters: {
        tripsForDisplay(state) {
            return state.trips;
        },
    },
    actions: {
        loadTrips(context, { searchedText }) {
            tripService.query(searchedText)
                .then(trips => {
                    context.commit({ type: 'loadTrips', trips })
                })
        },
        setCurrTrip(context, { currTripId }) {
            return tripService.getById(currTripId)
                .then(trip =>
                    context.commit({ type: 'setCurrTrip', trip }))
        }
    }
}
