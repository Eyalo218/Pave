import Vue from 'vue'
import Vuex from 'vuex'

import tripService from '../service/tripService.js'

export default {
  state: {
      trips: [],
  },
  mutations: {},
  actions: {
      loadTrips(context){
        console.log('bolbol')
      }
  }
}
