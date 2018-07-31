const REVIEW_URL = 'http://localhost:3000/reviews'
import axios from 'axios'


// function query() {
//     return axios.get(`${TRIPS_URL}`,
//         {
//             params: {
//                 searchedText
//             }
//         }
//     )
//         .then(res => {
//             return res.data
//         })
// }


function query(tripId) {
    return axios.get(`${REVIEW_URL}/${tripId}`)
        .then(res => {
            return res.data;
        })
}

function getByTripId(tripId) {
    console.log('omg its not working');
    return axios.get(`${REVIEW_URL}/${tripId}`)
        .then(res => {
            console.log('banana', res.data)
            return res.data;
        })
}


function addReview(review) {
    return axios.put(`${REVIEW_URL}`, review)
}

export default {
    getByTripId,
    addReview
}

