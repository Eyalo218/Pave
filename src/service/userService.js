import axios from 'axios'
import storageService from './storageService.js'
import {eventBus, LOGGED_IN} from './eventBus'


const USERS_URL = 'http://localhost:3000/users'
const STORAGE_KEY = 'loggedinUser';

var loggedinUser = storageService.loadFromStorage(STORAGE_KEY) || null;
if (loggedinUser) {
    eventBus.$emit(LOGGED_IN, loggedinUser)
}

// User sign up
function signup(userDetails) {
    console.log('front-end service got user signup ', userDetails)
    return axios.post(`${USERS_URL}/signup`, userDetails)
        .then(res => {
            _setLoggedinUser(res.data)
            return res.data
        })
        .catch(err => console.log('Problem talking to server', err))
}

// User log-in
function login(userCreds) {
    return axios.post(`${USERS_URL}/checkLogin`, userCreds)
        .then(res => {
            const user = res.data;
            _setLoggedinUser(user);
            return user;
        })
        .catch(err => console.log('Problem talking to server', err))
}

// Get user if logged in
function getLoggedinUser() {
    return loggedinUser
}

// Get user by ID
function getById(userId) {
    return axios.get(`${USERS_URL}/${userId}`)
            .then(res => res.data)
}

function editUser(user) {
    return axios.put(`${USERS_URL}/${user._id}`, user)
        .then(res => res.data)
}




function query() {

    return axios.get(`${USERS_URL}`)
            .then(res => {
                return {
                    users: res.data
                }
            })
}

function deleteUser(userId) {
    return axios.delete(`${USERS_URL}/${userId}`)
}

function addUser(user) {
        return axios.post(USERS_URL,user)
}


export default {
    signup,
    getLoggedinUser,
    login,
    getById,
    editUser
}

function _setLoggedinUser(user) {
    loggedinUser = user;
    storageService.saveToStorage(STORAGE_KEY, loggedinUser)
    eventBus.$emit(LOGGED_IN, user);
}