<template>
  <div class="asset-list">
    <section class="asset-list-add-button-section">
      <el-button type="primary" @click="onClickAddButton">新 增</el-button>
    </section>
    <el-table :data="tableData" style="width: 100%;" align="center">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="type" label="类型" min-width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" min-width="180" align="center"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="onClickEditButton(scope.row)">编辑</el-button>
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
        ref="addForm"
        label-position="right"
        label-width="100px"
        style="width: 100%">
        <el-form-item label="资产名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入资产名称" maxlength="128"></el-input>
        </el-form-item>
        <el-form-item label="资产分类" prop="type">
          <el-input v-model="formData.type" placeholder="请输入资产名称" maxlength="128"></el-input>
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
      formData: {
        id: null,
        name: '',
        type: ''
      },
      tableData: []
    }
  },
  created () {
    this.tableData = this.$db.get('asset').value()
  },
  methods: {
    onClickAddButton () {
      this.showAddAssetDialog = true
      this.dialogTitle = '新增'
    },
    onClickEditButton (row) {
      this.showAddAssetDialog = true
      this.dialogTitle = '编辑'
      this.formData = Object.assign({}, row)
    },
    addOrUpdateAsset () {
      if (this.dialogTitle === '新增') {
        const res = this.addAssetAction(this.formData)
        if (res) {
          this.$message.success('新增成功')
        }
      } else {
        const res = this.updateAssetAction(this.formData)
        if (res) {
          this.$message.success('更新成功')
        }
      }
    },
    closeDialog () {
      this.dialogTitle = '新增'
      this.$refs['addForm'].resetFields()
    },
    ...mapActions('asset', ['addAssetAction', 'updateAssetAction'])
  }
}
</script>
