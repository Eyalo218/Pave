import userService from '../service/userService.js'

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
        },
        setLoggedOut(state, payload) {
            state.currUserLogged = null;
            console.log('mut', state.currUserLogged)
        }
    },
    getters: {
        userToDisplay(state) {
          return state.currUser
        },
        loggedIn(state) {
            console.log('get', state.currUserLogged)
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