<template>
  <div class='project-container'>
    <el-tabs type='border-card'>
      <el-tab-pane label='Basic'>
        <Basic></Basic>
      </el-tab-pane>
      <el-tab-pane label='Postman'>
        <Postman></Postman>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Basic from '@/views/project/create/basic'
import Postman from '@/views/project/create/postman'

export default {
  name: 'ProjectCreate',
  components: {
    Basic,
    Postman
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
