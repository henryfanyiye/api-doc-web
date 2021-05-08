<template>
  <el-row :gutter='20' v-loading='loading'>
    <el-col :span='5'>
      <el-tree
          class='filter-tree'
          :data='data'
          :props='defaultProps'
          highlight-current
          accordion
          @node-click='handleNodeClick'
      >
        <span slot-scope='{ node, data }'>
          <span>
            <i :class='data.type==="catalog"?"el-icon-folder":"el-icon-document"'></i> {{ node.label }}
          </span>
        </span>
      </el-tree>
    </el-col>
    <el-col :span='14'>
      <Show v-show='!edit' :content='content' />
      <Edit v-show='edit' :content='content' />
    </el-col>
    <el-col :span='5'>
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
    </el-col>
  </el-row>
</template>

<script>
import { apiDetail, projectDetail } from '@/api/project'
import Show from './show'
import Edit from './edit'

export default {
  name: 'ProjectDetail',
  data() {
    return {
      edit: false,
      btnName: 'Edit',
      data: [],
      defaultProps: {
        label: 'name',
        type: 'type',
        children: 'items'
      },
      loading: false,
      content: null
    }
  },
  components: {
    Show,
    Edit
  },
  beforeMount() {
    if (this.$route.query.id) {
      this.loading = true
      projectDetail(this.$route.query.id).then(res => {
        this.data = res.data
        this.loading = false
      })
    }
  },
  methods: {
    handleNodeClick(data) {
      const that = this
      if (data.type === 'api') {
        that.loading = true
        apiDetail(data.id).then(res => {
          that.content = res.data.markdown
          that.edit = false
          that.loading = false
        })
      }
    },
    editContent() {
      this.edit = !this.edit
    }
  }
}
</script>

<style>
.el-row {
  padding: 20px;
}
</style>
