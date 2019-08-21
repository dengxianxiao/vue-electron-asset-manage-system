<template>
  <div class="asset-list">
    <el-form
      :model="searchForm"
      ref="searchForm"
      label-position="right"
      label-width="120px"
      style="width: 100%; margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="资产名称" prop="asset">
            <el-input v-model="searchForm.asset" placeholder="请输入资产名称" maxlength="128"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资产分类" prop="type">
            <el-select v-model="searchForm.type" style="display: block;">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="assetType in assetTypes"
                :key="assetType.id"
                :label="assetType.name"
                :value="assetType.enName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="使用开始时间" prop="beginTime">
            <el-date-picker
              v-model="searchForm.beginTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门" prop="department">
            <el-select v-model="searchForm.department" style="display: block;">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="department in departments"
                :key="department.id"
                :label="department.name"
                :value="department.enName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用结束时间">
            <el-date-picker
              v-model="searchForm.endTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="onSearch">查 询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <section class="asset-list-add-button-section">
      <el-button type="primary" @click="onClickAddButton">新 增</el-button>
    </section>
    <el-table :data="assetBorrows" style="width: 100%;" align="center">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="type" label="类型" :formatter="formatterAssetType" min-width="180" align="center"></el-table-column>
      <el-table-column prop="asset" label="资产" min-width="180" align="center"></el-table-column>
      <el-table-column prop="department" label="部门" :formatter="formatterDepartment" min-width="180" align="center"></el-table-column>
      <el-table-column prop="beginTime" label="使用开始时间" min-width="180" align="center"></el-table-column>
      <el-table-column prop="endTime" label="使用结束时间" min-width="180" align="center"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="onClickEditButton(scope.row)">编辑</el-button>
          <el-button type="text" @click="onClickDeleteButton(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next, jumper, ->, total"
        :current-page="queryPage.pageNum"
        :page-size="queryPage.pageSize"
        :total="queryPage.total"
        @current-change="changePageNum"
        :page-sizes="[10, 20, 30, 40, 50, 100]">
      </el-pagination>
    </div>

    <el-dialog
      v-if="showAddAssetDialog"
      :visible.sync="showAddAssetDialog"
      :title="dialogTitle"
      @close="closeDialog"
      width="800px">
      <el-form
        :model="formData"
        :rules="rules"
        ref="addForm"
        label-position="right"
        label-width="120px"
        style="width: 100%">
        <el-form-item label="部门" prop="department">
          <el-select v-model="formData.department" style="display: block;">
            <el-option
              v-for="department in departments"
              :key="department.id"
              :label="department.name"
              :value="department.enName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产分类" prop="type">
          <el-select v-model="formData.type" @change="changeAssetType(formData.type)" style="display: block;">
            <el-option
              v-for="assetType in assetTypes"
              :key="assetType.id"
              :label="assetType.name"
              :value="assetType.enName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产" prop="asset">
          <el-select v-model="formData.asset" style="display: block;">
            <el-option
              v-for="asset in assets"
              :key="asset.id"
              :label="asset.name"
              :value="asset.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用开始时间" prop="beginTime">
          <el-date-picker
            v-model="formData.beginTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="使用结束时间">
          <el-date-picker
            v-model="formData.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOrUpdateAsset">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'

export default {
  name: 'assetBorrow',
  data () {
    return {
      showAddAssetDialog: false,
      dialogTitle: '新增',
      searchForm: {
        asset: '',
        type: '',
        department: '',
        beginTime: '',
        endTime: ''
      },
      formData: {
        id: null,
        department: '',
        type: '',
        asset: '',
        beginTime: '',
        endTime: ''
      },
      rules: {
        department: [ {required: true, message: '请选择部门', trigger: 'blur'} ],
        type: [ {required: true, message: '请选择资产类型', trigger: 'blur'} ],
        asset: [ {required: true, message: '请选择资产', trigger: 'blur'} ],
        beginTime: [ {required: true, message: '请选择使用开始时间', trigger: 'blur'} ]
      },
      queryPage: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      assetTypes: [],
      departments: [],
      assets: [],
      assetBorrows: []
    }
  },
  created () {
    this.queryAssetBorrow()
    this.getAssetBorrowSize()
    this.queryAssetType()
    this.queryDepartment()
  },
  methods: {
    onSearch () {
      this.queryAssetBorrow()
    },
    /**
     * 查询资产流动记录
     */
    async queryAssetBorrow () {
      const params = Object.assign({}, this.queryPage, this.searchForm)
      const data = await this.queryAssetBorrowAction(params)
      this.assetBorrows = data
    },
    /**
     * 查询总条数
     */
    async getAssetBorrowSize () {
      const data = await this.getAssetBorrowSizeAction()
      this.queryPage.total = data
    },
    /**
     * 查询资产类型
     */
    async queryAssetType () {
      const data = await this.queryAssetTypeAction()
      this.assetTypes = data
    },
    /**
     * 查询部门
     */
    async queryDepartment () {
      const data = await this.queryDepartmentAction()
      this.departments = data
    },
    /**
     * 新增记录时修改资产类型，关联查询所有资产
     */
    async changeAssetType (assetType) {
      const params = {
        type: assetType
      }
      this.assets = await this.queryAssetAction(params)
    },
    onClickAddButton () {
      this.showAddAssetDialog = true
      this.dialogTitle = '新增'
    },
    onClickEditButton (row) {
      this.showAddAssetDialog = true
      this.dialogTitle = '编辑'
      this.formData = Object.assign({}, row)
    },
    onClickDeleteButton (row) {
      const res = this.deleteAssetBorrowAction(row.id)
      if (res) {
        this.$message.success('删除成功')
        this.queryAssetBorrow()
      }
    },
    /**
     * 新增或修改资产流动记录
     */
    addOrUpdateAsset () {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          if (this.dialogTitle === '新增') {
            const res = this.addAssetBorrowAction(this.formData)
            if (res) {
              this.$message.success('新增成功')
              this.queryAssetBorrow()
              this.showAddAssetDialog = false
            }
          } else {
            const res = this.updateAssetBorrowAction(this.formData)
            if (res) {
              this.$message.success('更新成功')
              this.queryAssetBorrow()
              this.showAddAssetDialog = false
            }
          }
        }
      })
    },
    changePageNum (pageNum) {
      this.queryPage.pageNum = pageNum
      this.queryAssetBorrow()
    },
    /**
     * 格式化资产类型
     */
    formatterAssetType (row, column, cellValue, index) {
      let asset = this.assetTypes.find(asset => asset.enName === cellValue)
      if (asset) {
        return asset.name
      }
      return cellValue
    },
    /**
     * 格式化资产类型
     */
    formatterDepartment (row, column, cellValue, index) {
      let department = this.departments.find(department => department.enName === cellValue)
      if (department) {
        return department.name
      }
      return cellValue
    },
    closeDialog () {
      this.dialogTitle = '新增'
      this.$refs['addForm'].resetFields()
    },
    ...mapActions('assetBorrow', [
      'getAssetBorrowSizeAction',
      'queryAssetBorrowAction',
      'addAssetBorrowAction',
      'updateAssetBorrowAction',
      'deleteAssetBorrowAction'
    ]),
    ...mapActions('asset', ['queryAssetAction']),
    ...mapActions('assetType', ['queryAssetTypeAction']),
    ...mapActions('department', ['queryDepartmentAction'])
  }
}
</script>

<style lang="less" scoped>
.asset-list {
  .asset-list-add-button-section {
    margin-bottom: 20px;
  }
}
</style>

<style lang="less">
.pagination {
  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
