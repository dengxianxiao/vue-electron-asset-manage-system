<template>
  <el-container>
    <el-form
      :model="formData"
      label-position="right"
      label-width="100px"
      style="width: 60%">
      <el-form-item label="资产名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入资产名称" maxlength="128"></el-input>
      </el-form-item>
      <el-form-item label="资产分类" prop="type">
        <el-input v-model="formData.type" placeholder="请输入资产名称" maxlength="128"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addAsset">新 增</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'addAsset',
  data () {
    return {
      formData: {
        name: '',
        type: ''
      }
    }
  },
  methods: {
    addAsset () {
      const res = this.addAssetAction(this.formData)
      if (res) {
        this.$message.success('新增资源成功')
      }
    },
    ...mapActions('asset', ['addAssetAction'])
  }
}
</script>
