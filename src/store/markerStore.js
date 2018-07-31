import tripService from '../service/tripService.js'

export default {
    state: {
        markers: [],
        currMarker: null
    },
    mutations: {
        setMarkers(state, { markers }) {
            state.markers = markers;
        },
        addMarker(state, { marker }) {
            state.markers.push(marker);
        },
        setCurrMarker(state, { currMarker }) {
            state.currMarker = currMarker;
        }
    },
    getters: {
        markersForDisplay(state) {
            return state.markers;
        },
    },
    actions: {
        loadMarkers(context, { currTrip }) {
            return tripService.getById(tripId)
                .then(trip => {
                    context.commit({ type: 'loadTrips', trips })
                })
        }
    }
}