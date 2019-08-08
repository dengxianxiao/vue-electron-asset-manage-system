import db from '@/db'

const state = {
  id: 0
}

const getters = {
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
  /**
   * 获取当前资产最大的主键
   */
  getMaxAssetId ({ commit }) {
    let latestObj = db.get('asset').maxBy(asset => asset.id).value()
    if (latestObj) {
      commit('UPDATE_ID', latestObj.id)
    }
  },
  /**
   * 新增资产
   * @param {*} param0 commit
   * @param {Object} asset 新增资产数据
   */
  addAssetAction ({ state, commit }, asset) {
    commit('INCREMENT_ID')
    let newAsset = Object.assign({}, asset, { id: state.id })
    db.get('asset').push(newAsset).write()
    return true
  },
  /**
   * 更新资源信息
   * @param {*} param0 commit
   * @param {Object} asset 修改的资源
   */
  updateAssetAction ({ state, commit }, asset) {
    db.get('asset').find({ id: asset.id }).assign(asset).write()
    return true
  },
  /**
   * 删除资源
   * @param {*} param0 commit
   * @param {Number} id 要删除的资源id
   */
  deleteAssetAction ({ commit }, id) {
    db.get('asset').remove({ id: id }).write()
    return true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
