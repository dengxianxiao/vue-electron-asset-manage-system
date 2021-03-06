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
   * 获取当前资产类型最大的主键
   */
  getMaxAssetTypeId ({ commit }) {
    let latestObj = db.get('assetType').maxBy(asset => asset.id).value()
    if (latestObj) {
      commit('UPDATE_ID', latestObj.id)
    }
  },
  /**
   * 查询所有资产列表
   */
  queryAssetTypeAction ({ commit }, searchParams) {
    const filterFunction = function (obj) {
      let hasEnName = true
      let hasName = true
      if (searchParams) {
        if (searchParams.enName) {
          hasEnName = obj.enName.indexOf(searchParams.enName) >= 0
        }
        if (searchParams.name) {
          hasName = obj.name.indexOf(searchParams.name) >= 0
        }
      }
      return hasEnName && hasName
    }
    const data = db.get('assetType').filter(filterFunction).cloneDeep().value()
    return data
  },
  /**
   * 新增资产
   * @param {*} param0 commit
   * @param {Object} asset 新增资产数据
   */
  addAssetTypeAction ({ state, commit }, assetType) {
    commit('INCREMENT_ID')
    let newAsset = Object.assign({}, assetType, { id: state.id })
    db.get('assetType').push(newAsset).write()
    return true
  },
  /**
   * 更新资源信息
   * @param {*} param0 commit
   * @param {Object} asset 修改的资源
   */
  updateAssetTypeAction ({ state, commit }, assetType) {
    db.get('assetType').find({ id: assetType.id }).assign(assetType).write()
    return true
  },
  /**
   * 删除资源
   * @param {*} param0 commit
   * @param {Number} id 要删除的资源id
   */
  deleteAssetTypeAction ({ commit }, id) {
    db.get('assetType').remove({ id: id }).write()
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
