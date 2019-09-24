import Axios from '../../interceptors';

//Initial state
const state = {
    user: {},
}

//Getters
const getters = {
    following: state => state.user.following.length,
    followers: state => state.user.followers.length
}

//Mutations
const mutations = {
    setUser: (state, user) => state.user = user,
}

//Actions
const actions = {
    getUser: ({ commit }) => {
        Axios.get('http://localhost:3001/twitter/users/user')
            .then(res => commit('setUser', res.data))
            .catch(err => commit('setUser', err))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}