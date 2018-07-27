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
        loadMarkers(context) {
            tripService.query()
                .then(trips => context.commit({ type: 'loadTrips', trips }))
        }
    }
}