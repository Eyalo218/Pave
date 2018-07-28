const USERS_URL = 'http://localhost:3000/users'
import axios from 'axios'

function signup(userDetails) {
    console.log('front-end service got user signup ', userDetails)
    return axios.post(`${USERS_URL}/signup`, userDetails)
        .then(res => res.data)
        .catch(err => console.log('Problem talking to server', err))

}




function query() {

    return axios.get(`${USERS_URL}`)
            .then(res => {
                return {
                    users: res.data
                }
            })
}

function getById(userId) {
    return axios.get(`${USERS_URL}/${userId}`)
            .then(resolveData)

}

function deleteUser(userId) {
    return axios.delete(`${USERS_URL}/${userId}`)
}

function addUser(user) {
        return axios.post(USERS_URL,user)
}

function editUser(userId) {
    return axios.put(`${USERS_URL}/${userId}`,user)
}

export default {
    signup,
}

