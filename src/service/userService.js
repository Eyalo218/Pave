const USERS_URL = 'http://localhost:3000/users'


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
    query,
    getById,
    deleteUser,
    addUser,
    editUser
}

