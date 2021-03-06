// const TRIPS_URL = 'http://localhost:3000/trips'
import axios from 'axios'

const TRIPS_URL = (process.env.NODE_ENV !== 'development')
 ? '/trips'
 : 'http://localhost:3000/trips';

function query(searchedText = '', userId = null, isActive = false) {    
    return axios.get(`${TRIPS_URL}`,
        {   
            params: {
                searchedText,
                userId,
                isActive
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

function getpinsByUserPins(userPins) {
    return userPins.map(tripId => {
        return axios.get(`${TRIPS_URL}/${tripId}`, trip)
    })
}

export default {
    query,
    getById,
    deleteTrip,
    addTrip,
    editTrip,
    getTripsByUserId
}

