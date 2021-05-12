<template>
  <el-dropdown v-if='content'>
        <span class='el-dropdown-link'>
          更多<i class='el-icon-arrow-down el-icon--right' />
        </span>
    <el-dropdown-menu slot='dropdown'>
      <el-dropdown-item icon='el-icon-plus'>新增</el-dropdown-item>
      <el-dropdown-item icon='el-icon-edit' @click.native='editContent'>编辑</el-dropdown-item>
      <el-dropdown-item icon='el-icon-share'>分享</el-dropdown-item>
      <el-dropdown-item icon='el-icon-delete'>删除</el-dropdown-item>
      <el-dropdown-item icon='el-icon-download'>下载</el-dropdown-item>
      <el-dropdown-item icon='el-icon-setting'>设置</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

export default {
  name: 'RightMenu',
  props: {
    content: String,
    editContent: Function
  }
}
</script>
