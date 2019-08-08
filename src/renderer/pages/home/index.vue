<template>
  <el-container class="home">
    <el-header class="header-container"></el-header>
    <el-container>
      <el-aside style="width: 200px">
        <el-menu
          default-active="landing-page"
          router
          class="el-menu-vertical">
          <el-menu-item index="landing-page">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="add-asset">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="add-asset-type">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
          <el-menu-item index="asset-list">
            <i class="el-icon-setting"></i>
            <span slot="title">导航五</span>
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
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.home {
  .header-container {
    background-color: lightblue;
  }
}
</style>
