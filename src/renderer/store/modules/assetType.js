import db from '@/db'

const state = {
  id: 0
}

const mutations = {
  INCREMENT_ID (state) {
    state.id++
  },
  UPDATE_ID (state, id) {
    state.id = id
  }
}

const actions = {
  getMaxAssetTypeId ({ commit }) {
    let latestObj = db.get('assetType').maxBy(assetType => assetType.id).value()
    if (latestObj) {
      commit('UPDATE_ID', latestObj.id)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
