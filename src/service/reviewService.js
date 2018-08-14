import axios from 'axios'
// const REVIEW_URL = 'http://localhost:3000/reviews'

const REVIEW_URL = (process.env.NODE_ENV !== 'development')
 ? '/reviews'
 : 'http://localhost:3000/reviews';

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
    return axios.post(`${REVIEW_URL}`, review)
}

export default {
    getByTripId,
    addReview
}

