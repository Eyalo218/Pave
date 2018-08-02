import Vue from 'vue'
import Vuex from 'vuex'

import tripService from '../service/tripService.js'

export default {
    state: {
        trips: [],
        currTrip: null,
        currUserTrips: [],
        explore: false,
    },
    mutations: {
        loadTrips(state, { trips }) {
            state.trips = trips
        },
        setCurrTrip(state, { trip }) {
            state.currTrip = trip
        },
        userTripsToDisplay(state, {trips}) {
            state.currUserTrips = trips
        },
        updateExplore(state, {currStatus}){
            console.log('bol',currStatus.currStatus)
            state.explore = currStatus
        }
    },
    getters: {
        tripsForDisplay(state) {
            return state.trips;
        },
        getCurrTrip(state){
            return state.currTrip;
        },
        userTripsToDisplay(state){
            return state.currUserTrips;
        },
        isExploreOpen(state) {
            return state.explore
        }
    },
    actions: {
        loadTrips(context, { searchedText }) {
            return tripService.query(searchedText)
                .then(trips => {
                    context.commit({ type: 'loadTrips', trips })
                })
        },
        setCurrTrip(context, { currTripId }) {
            return tripService.getById(currTripId)
                .then(trip => context.commit({ type: 'setCurrTrip', trip }))
        },
        loadTripsByUserId(context, {userId}) {
            console.log('user id in store', userId)
            return tripService.query('' ,userId)
                .then(trips => context.commit({ type: 'userTripsToDisplay', trips }))
        },
        updateExplore(context, {currStatus}){
            context.commit({type: 'updateExplore', currStatus})
        }
    }
}
