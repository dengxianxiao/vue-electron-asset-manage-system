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
          <el-form-item label="资产名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入资产名称" maxlength="128"></el-input>
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
      <el-row>
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
    <el-table :data="assets" style="width: 100%;" align="center">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="type" label="类型" min-width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" min-width="180" align="center"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="onClickEditButton(scope.row)">编辑</el-button>
          <el-button type="text" @click="onClickDeleteButton(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
        label-width="100px"
        style="width: 100%">
        <el-form-item label="资产分类" prop="type">
          <el-select v-model="formData.type" style="display: block;">
            <el-option
              v-for="assetType in assetTypes"
              :key="assetType.id"
              :label="assetType.name"
              :value="assetType.enName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入资产名称" maxlength="128"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOrUpdateAsset">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'assetList',
  data () {
    return {
      showAddAssetDialog: false,
      dialogTitle: '新增',
      searchForm: {
        name: '',
        type: ''
      },
      formData: {
        id: null,
        name: '',
        type: ''
      },
      rules: {
        name: [ {required: true, message: '请输入资产名称', trigger: 'blur'} ],
        type: [ {required: true, message: '请选择资产类型', trigger: 'blur'} ]
      },
      assets: [],
      assetTypes: []
    }
  },
  created () {
    this.queryAsset()
    this.queryAssetType()
  },
  methods: {
    onSearch () {
      this.queryAsset()
    },
    async queryAsset () {
      const data = await this.queryAssetAction(this.searchForm)
      this.assets = data
    },
    async queryAssetType () {
      const data = await this.queryAssetTypeAction()
      this.assetTypes = data
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
      const res = this.deleteAssetAction(row.id)
      if (res) {
        this.$message.success('删除成功')
        this.queryAsset()
      }
    },
    addOrUpdateAsset () {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          if (this.dialogTitle === '新增') {
            let asset = this.assets.find(asset => asset.name === this.formData.name)
            if (asset) {
              this.$message.error('该名称已存在，请重新输入')
              return
            }
            const res = this.addAssetAction(this.formData)
            if (res) {
              this.$message.success('新增成功')
              this.queryAsset()
              this.showAddAssetDialog = false
            }
          } else {
            let asset = this.assets.find(asset => asset.name === this.formData.name && asset.id !== this.formData.id)
            if (asset) {
              this.$message.error('该名称已存在，请重新输入')
              return
            }
            const res = this.updateAssetAction(this.formData)
            if (res) {
              this.$message.success('更新成功')
              this.queryAsset()
              this.showAddAssetDialog = false
            }
          }
        }
      })
    },
    closeDialog () {
      this.dialogTitle = '新增'
      this.$refs['addForm'].resetFields()
    },
    ...mapActions('asset', [
      'queryAssetAction',
      'addAssetAction',
      'updateAssetAction',
      'deleteAssetAction'
    ]),
    ...mapActions('assetType', ['queryAssetTypeAction'])
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
