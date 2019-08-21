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
   * 查询所有资产列表
   */
  queryAssetAction ({ commit }, searchParams) {
    const filterFunction = function (obj) {
      let hasType = true
      let hasName = true
      if (searchParams) {
        if (searchParams.type) {
          hasType = obj.type.indexOf(searchParams.type) >= 0
        }
        if (searchParams.name) {
          hasName = obj.name.indexOf(searchParams.name) >= 0
        }
      }
      return hasType && hasName
    }
    const data = db.get('asset').filter(filterFunction).cloneDeep().value()
    return data
  },
  /**
   * 根据名称判断要新增的名称是否已存在
   * @param {*} content
   * @param {Object} asset 要新增的名称
   */
  hasAssetAction (content, asset) {
    const obj = db.get('asset').find({ name: asset.name })
    return !!obj
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
