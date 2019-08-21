<template>
  <div class="department-list">
    <el-form
      :model="searchForm"
      ref="searchForm"
      label-position="right"
      label-width="120px"
      style="width: 100%; margin-bottom: 20px;">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="部门英文名称" prop="enName">
            <el-input v-model="searchForm.enName" placeholder="请输入部门英文名称" maxlength="128"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门中文名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入部门中文名称" maxlength="128"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="onSearch">查 询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <section class="department-list-add-button-section">
      <el-button type="primary" @click="onClickAddButton">新 增</el-button>
    </section>
    <el-table :data="tableData" style="width: 100%;" align="center">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="enName" label="部门英文名称" min-width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="部门中文名称" min-width="180" align="center"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="onClickEditButton(scope.row)">编辑</el-button>
          <el-button type="text" @click="onClickDeleteButton(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-if="showAddDepartmentDialog"
      :visible.sync="showAddDepartmentDialog"
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
        <el-form-item label="部门英文名称" prop="enName">
          <el-input v-model="formData.enName" placeholder="请输入部门英文名称" maxlength="128"></el-input>
        </el-form-item>
        <el-form-item label="部门中文名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门中文名称" maxlength="128"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOrUpdateAssetType">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'departmentList',
  data () {
    return {
      showAddDepartmentDialog: false,
      dialogTitle: '新增',
      searchForm: {
        name: '',
        enName: ''
      },
      formData: {
        id: null,
        name: '',
        enName: ''
      },
      rules: {
        name: [ {required: true, message: '请输入部门中文名称', trigger: 'blur'} ],
        enName: [ {required: true, message: '请输入部门英文名称', trigger: 'blur'} ]
      },
      tableData: []
    }
  },
  created () {
    this.queryDepartment()
  },
  methods: {
    onSearch () {
      this.queryDepartment()
    },
    async queryDepartment () {
      const data = await this.queryDepartmentAction(this.searchForm)
      this.tableData = data
    },
    onClickAddButton () {
      this.showAddDepartmentDialog = true
      this.dialogTitle = '新增'
    },
    onClickEditButton (row) {
      this.showAddDepartmentDialog = true
      this.dialogTitle = '编辑'
      this.formData = Object.assign({}, row)
    },
    onClickDeleteButton (row) {
      const res = this.deleteDepartmentAction(row.id)
      if (res) {
        this.$message.success('删除成功')
        this.queryDepartment()
      }
    },
    addOrUpdateAssetType () {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          if (this.dialogTitle === '新增') {
            const res = this.addDepartmentAction(this.formData)
            if (res) {
              this.$message.success('新增成功')
              this.queryDepartment()
              this.showAddDepartmentDialog = false
            }
          } else {
            const res = this.updateDepartmentAction(this.formData)
            if (res) {
              this.$message.success('更新成功')
              this.queryDepartment()
              this.showAddDepartmentDialog = false
            }
          }
        }
      })
    },
    closeDialog () {
      this.dialogTitle = '新增'
      this.$refs['addForm'].resetFields()
    },
    ...mapActions('department', [
      'queryDepartmentAction',
      'addDepartmentAction',
      'updateDepartmentAction',
      'deleteDepartmentAction'
    ])
  }
}
</script>

<style lang="less" scoped>
.department-list {
  .department-list-add-button-section {
    margin-bottom: 20px;
  }
}
</style>
