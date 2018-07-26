import Vue from 'vue'
import Vuex from 'vuex'

import tripService from '../service/tripService.js'

export default {
  state: {
      trips: [],
  },
  mutations: {
      loadTrips(state, {trips}) {
          state.trips = trips
          console.log('trips', state.trips)
      },
  },
  getters: {
      tripsForDisplay(state) {
        return state.trips
      },
  },
  actions: {
      loadTrips(context){
          tripService.query()
              .then(trips => context.commit({type: 'loadTrips', trips}))
      }
  }
}
