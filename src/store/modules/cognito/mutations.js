import * as types from './mutations-types'

export default {
  [types.GET_USER] (state, user) {
    state.user = user
  },

  [types.IS_AUTHENTICATED] (state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },

  [types.SET_ADMIN] (state, admin) {
    state.admin = admin
  },

  [types.SET_TOKEN] (state, token) {
    state.token = token
  },

  [types.SET_USER_EMAIL] ( state, userEmail) {
    state.userEmail = userEmail
  }
}
