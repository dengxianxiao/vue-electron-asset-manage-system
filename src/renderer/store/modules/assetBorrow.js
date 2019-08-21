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
   * 获取当前资产使用最大的主键
   */
  getMaxAssetBorrowId ({ commit }) {
    let latestObj = db.get('assetBorrow').maxBy(assetBorrow => assetBorrow.id).value()
    if (latestObj) {
      commit('UPDATE_ID', latestObj.id)
    }
  },
  /**
   * 查询资产流动长度
   */
  getAssetBorrowSizeAction () {
    return db.get('assetBorrow').size().value()
  },
  /**
   * 查询资产列表
   */
  queryAssetBorrowAction ({ commit }, searchParams) {
    let param = {}
    if (searchParams) {
      if (searchParams.type) {
        param.type = searchParams.type
      }
      if (searchParams.name) {
        param.name = searchParams.name
      }
      if (searchParams.department) {
        param.department = searchParams.department
      }
    }
    // 查询过滤函数
    const filterFunction = function (obj) {
      let hasType = true
      let hasAsset = true
      let hasDepartment = true
      let hasBeginTime = true
      let hasEndTime = true
      if (searchParams) {
        if (searchParams.type) {
          hasType = obj.type.indexOf(searchParams.type) >= 0
        }
        if (searchParams.asset) {
          hasAsset = obj.asset.indexOf(searchParams.asset) >= 0
        }
        if (searchParams.department) {
          hasDepartment = obj.department.indexOf(searchParams.department) >= 0
        }
        if (searchParams.beginTime && obj.beginTime) {
          hasBeginTime = new Date(obj.beginTime).getTime() >= new Date(searchParams.beginTime).getTime()
        }
        if (searchParams.endTime && obj.endTime) {
          hasBeginTime = new Date(obj.endTime).getTime() <= new Date(searchParams.endTime).getTime()
        }
        return hasType && hasAsset && hasDepartment && hasBeginTime && hasEndTime
      }
    }
    const data = db.get('assetBorrow').filter(filterFunction).chunk(searchParams.pageSize).cloneDeep().value()[searchParams.pageNum - 1]
    return data
  },
  /**
   * 新增资产
   * @param {*} param0 commit
   * @param {Object} asset 新增资产数据
   */
  addAssetBorrowAction ({ state, commit }, assetBorrow) {
    commit('INCREMENT_ID')
    let newAssetBorrow = Object.assign({}, assetBorrow, { id: state.id })
    db.get('assetBorrow').push(newAssetBorrow).write()
    return true
  },
  /**
   * 更新资源信息
   * @param {*} param0 commit
   * @param {Object} asset 修改的资源
   */
  updateAssetBorrowAction ({ state, commit }, assetBorrow) {
    db.get('assetBorrow').find({ id: assetBorrow.id }).assign(assetBorrow).write()
    return true
  },
  /**
   * 删除资源
   * @param {*} param0 commit
   * @param {Number} id 要删除的资源id
   */
  deleteAssetBorrowAction ({ commit }, id) {
    db.get('assetBorrow').remove({ id: id }).write()
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
