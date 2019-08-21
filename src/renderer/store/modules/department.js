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
   * 获取当前部门最大的主键
   */
  getMaxDepartmentId ({ commit }) {
    let latestObj = db.get('department').maxBy(asset => asset.id).value()
    if (latestObj) {
      commit('UPDATE_ID', latestObj.id)
    }
  },
  /**
   * 查询所有部门列表
   */
  queryDepartmentAction ({ commit }, searchParams) {
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
    const data = db.get('department').filter(filterFunction).cloneDeep().value()
    return data
  },
  /**
   * 新增部门
   * @param {*} param0 commit
   * @param {Object} department 新增部门数据
   */
  addDepartmentAction ({ state, commit }, department) {
    commit('INCREMENT_ID')
    let newDepartment = Object.assign({}, department, { id: state.id })
    db.get('department').push(newDepartment).write()
    return true
  },
  /**
   * 更新资源信息
   * @param {*} param0 commit
   * @param {Object} department 修改的资源
   */
  updateDepartmentAction ({ state, commit }, department) {
    db.get('department').find({ id: department.id }).assign(department).write()
    return true
  },
  /**
   * 删除资源
   * @param {*} param0 commit
   * @param {Number} id 要删除的资源id
   */
  deleteDepartmentAction ({ commit }, id) {
    db.get('department').remove({ id: id }).write()
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
