<template>
  <el-container>
    <el-form
      :model="formData"
      label-position="right"
      label-width="100px"
      style="width: 60%">
      <el-form-item label="分类英文名称" prop="enName">
        <el-input v-model="formData.enName" placeholder="请输入分类英文名称" maxlength="128"></el-input>
      </el-form-item>
      <el-form-item label="分类中文名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入分类中文名称" maxlength="128"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addAssetType">新 增</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>

export default {
  name: 'addAssetType',
  data () {
    return {
      formData: {
        name: '',
        enName: ''
      }
    }
  },
  methods: {
    addAssetType () {
      const param = {
        name: this.formData.name,
        enName: this.formData.enName
      }
      this.$db.get('assetType').push(param).write()
      this.$message.success('新增成功')
    }
  }
}
</script>
