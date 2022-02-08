import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const module = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

export default {module}
