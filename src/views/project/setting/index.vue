<template>
  <div class='project-container'>
    <el-tabs type='border-card'>
      <el-tab-pane label='基础信息'>
        <Basic></Basic>
      </el-tab-pane>
      <el-tab-pane label='成员管理'>成员管理</el-tab-pane>
      <el-tab-pane label='高级设置'>
        <advanced></advanced>
      </el-tab-pane>
      <el-tab-pane label='回收站'>回收站</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Basic from '@/views/project/setting/basic'
import Advanced from '@/views/project/setting/advanced'

export default {
  name: 'ProjectSetting',
  components: {
    Basic,
    Advanced
  }
}
</script>

<style lang='scss' scoped>
.project-container {
  width: 50%;
  margin: 20px auto;
  position: relative;
}
</style>
