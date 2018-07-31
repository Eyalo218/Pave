import userService from '../service/userService.js'
import storageService from '../service/storageService.js'

export default {
    state: {
        currUserLogged: null,
        currUser: null,
        currUserTrips: null,
    },
    mutations: {
        setCurrUser(state, {user}) {
            state.currUser = user
        },
        setLoggedIn(state, {user}) {
            state.currUserLogged = user;
            storageService.saveToStorage('loggedInUser', user)
        },
        setLoggedOut(state, payload) {
            state.currUserLogged = null;
            localStorage.removeItem('loggedInUser')
        }
    },
    getters: {
        userToDisplay(state) {
          return state.currUser
        },
        loggedIn(state) {
            return state.currUserLogged 
        }
    },
    actions: {
        loadUserById(context, {id}) {
            userService.getById(id)
                .then(user => context.commit({ type: 'setCurrUser', user }))
        },
        loggedIn(context, {user}) {
            context.commit({ type: 'setLoggedIn', user })
        },
        loggedOut(context) {
            context.commit({type: 'setLoggedOut'})
        }
    }
}