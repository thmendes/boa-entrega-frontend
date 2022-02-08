import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'
import createPersistedState from 'vuex-persistedstate'
const set = property => (store, payload) => (store[property] = payload)
Vue.use(Vuex)
export default new Vuex.Store({
  mutations:
  {
    setSnackbar: set('snackbar'),
    ...mutations
  },
  state,
  actions,
  getters,
  ...modules,
  plugins: [createPersistedState()]
});
