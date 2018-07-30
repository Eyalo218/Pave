const TRIPS_URL = 'http://localhost:3000/trips'
import axios from 'axios'


function query(searchedText = '', userId = null) {
    return axios.get(`${TRIPS_URL}`,
        {
            params: {
                searchedText,
                userId
            }
        }
    )
        .then(res => {
            return res.data
        })
}

function getById(tripId) {
    return axios.get(`${TRIPS_URL}/${tripId}`)
        .then(res => {
            return res.data;
        })
}

function deleteTrip(tripId) {
    return axios.delete(`${TRIPS_URL}/${tripId}`)
}

function addTrip(trip) {
    if (trip._id) {
        return axios.put(`${TRIPS_URL}/${trip._id}`, trip)
    } else {
        return axios.post(TRIPS_URL, trip)
            .then(trip => trip.data)
    }
}

function editTrip(tripId, trip) {
    return axios.put(`${TRIPS_URL}/${tripId}`, trip)
}

function getTripsByUserId(userId) {
    return axios.get(`${TRIPS_URL}/${userId}`, trip)
}

export default {
    query,
    getById,
    deleteTrip,
    addTrip,
    editTrip,
    getTripsByUserId
}

