const USERS_URL = 'http://localhost:3000/trips'
import axios from 'axios'


function query() {

    return axios.get(`${USERS_URL}`)
            .then(res => {
                return res.data
            })
}

function getById(tripId) {
    return axios.get(`${USERS_URL}/${tripId}`)
            .then(resolveData)

}

function deleteTrip(tripId) {
    return axios.delete(`${USERS_URL}/${tripId}`)
}

function addTrip(trip) {
    if (trip._id){
        return axios.put(`${USERS_URL}/${trip._id}`,trip)
    } else {
        return axios.post(USERS_URL,trip)
    }
}

function editTrip(tripId) {
  return axios.put(`${USERS_URL}/${tripId}`,trip)
}

export default {
    query,
    getById,
    deleteTrip,
    addTrip,
    editTrip
}

