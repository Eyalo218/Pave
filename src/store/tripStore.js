import Vue from 'vue'
import Vuex from 'vuex'

import tripService from '../service/tripService.js'

export default {
    state: {
        trips: [],
        activeTrips: [],
        currUserTrips: [],
        sortedTrips: [],
        currTrip: null,
        explore: false,
        sortedByReviews: false,
        currFilter: '',
    },
    mutations: {
        loadTrips(state, { trips }) {
            state.trips = trips;
        },
        loadActiveTrips(state, { trips }) {
            state.activeTrips = trips;
        },
        loadSortedTrips(state, { trips }) {
            state.sortedTrips = trips;
        },
        setCurrTrip(state, { trip }) {
            state.currTrip = trip
        },
        userTripsToDisplay(state, { trips }) {
            state.currUserTrips = trips
        },
        userPinsToDisplay(state, { trips }) {
            state.currUserTrips = trips
            console.log('In Tha state ', state.currUserTrips)
        },
        updateExplore(state, { currStatus }) {
            state.explore = currStatus
        },
        updateFilter(state, { trips }) {
            state.trips = trips
        },
        updateSearchedText(state, { searchedText }) {
            state.currFilter = searchedText;
        },
    },
    getters: {
        tripsForDisplay(state) {
            return state.trips;
        },
        activeTripsForDisplay(state) {
            return state.activeTrips;
        },
        sortedTripsForDisplay(state) {
            return state.sortedTrips.sort(function (a, b) { return b.avgReviews - a.avgReviews })
        },
        getCurrTrip(state) {
            return state.currTrip;
        },
        getCurrFilter(state){
            return state.currFilter;
        },
        userTripsToDisplay(state) {
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
        loadActiveTrips(context) {
            return tripService.query('', null, true)
                .then(trips => {
                    context.commit({ type: 'loadActiveTrips', trips })
                })
        },
        loadSortedTrips(context) {
            return tripService.query()
                .then(trips => {
                    context.commit({ type: 'loadSortedTrips', trips })
                })
        },
        setCurrTrip(context, { currTripId }) {
            return tripService.getById(currTripId)
                .then(trip => context.commit({ type: 'setCurrTrip', trip }))
        },
        loadTripsByUserId(context, { userId }) {
            return tripService.query('', userId)
                .then(trips => context.commit({ type: 'userTripsToDisplay', trips }))
        },
        updateExplore(context, { currStatus }) {
            context.commit({ type: 'updateExplore', currStatus })
        },
        setFilter(context, { searchedText }) {
            return tripService.query(searchedText, null)
                .then(trips => {
                    context.commit({ type: 'updateFilter', trips })
                    context.commit({ type: 'updateSearchedText', searchedText })
                })
            // context.commit({type: 'updateFilter', searchedText})
            // state.currFilter = searchedText;
        },
        getPins(context, { pins }) {
            return Promise.all(pins.map(tripId => tripService.getById(tripId)))
                .then(trips => {
                    context.commit({ type: 'userPinsToDisplay', trips })
                    console.log('crhipes, ', trips)
                })
        }
    }
}
