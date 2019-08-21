<template>
  <el-container class="home">
    <el-header class="header-container">
      <div class="header-left">
        <span class="title">资产管理系统</span>
      </div>
      <div class="header-right"></div>
    </el-header>
    <el-container>
      <el-aside style="width: 200px; height: 100%">
        <el-menu
          default-active="asset-borrow"
          router
          class="el-menu-vertical">
          <el-menu-item index="asset-borrow">
            <i class="el-icon-menu"></i>
            <span slot="title">资产流动管理</span>
          </el-menu-item>
          <el-menu-item index="asset-type-list">
            <i class="el-icon-s-grid"></i>
            <span slot="title">资产类型管理</span>
          </el-menu-item>
          <el-menu-item index="asset-list">
            <i class="el-icon-s-goods"></i>
            <span slot="title">资产管理</span>
          </el-menu-item>
          <el-menu-item index="department-list">
            <i class="el-icon-s-cooperation"></i>
            <span slot="title">部门管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    }
  },
  computed: {
  },
  created () {
    /**
     * 初始化资产最大ID
     */
    this.$store.dispatch('asset/getMaxAssetId')
    /**
     * 初始化资产类型最大ID
     */
    this.$store.dispatch('assetType/getMaxAssetTypeId')
    /**
     * 初始化资产类型最大ID
     */
    this.$store.dispatch('department/getMaxDepartmentId')
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.home {
  .header-container {
    background-color: #dff8ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      margin-left: 40px;
      .title {
        font-size: 24px;
        letter-spacing: 2px;
        font-style: oblique;
      }
    }
  }
}
</style>

<style lang="less">
.home {
  .el-aside .el-menu {
    height: 90vh;
  }
}
</style>
