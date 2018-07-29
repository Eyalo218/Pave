import userService from '../service/userService.js'

export default {
    state: {
        currUser: null,
    },
    mutations: {
        setCurrUser(state, {user}) {
            state.currUser = user
        }
    },
    getters: {
        userToDisplay(state) {
          return state.currUser
        }
    },
    actions: {
        loadUserById(context, {id}) {
                userService.getById(id)
                    .then(user => context.commit({ type: 'setCurrUser', user }))
        }
    }
}