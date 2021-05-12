<template>
  <el-row :gutter='20' v-loading='loading'>
    <el-col :span='5'>
      <LeftMenu :apiList='apiList' :handleNodeClick='handleNodeClick' />
    </el-col>
    <el-col :span='16'>
      <Preview :content='content' />
    </el-col>
    <el-col :span='3'>
      <RightMenu :content='content' :editContent='editContent' />
    </el-col>
  </el-row>
</template>

<script>
import { apiDetail, projectDetail } from '@/api/project'
import LeftMenu from './components/LeftMenu'
import Preview from './components/Preview'
import RightMenu from './components/RightMenu'

export default {
  name: 'ProjectDetail',
  data() {
    return {
      apiList: [],
      defaultProps: {
        label: 'name',
        type: 'type',
        children: 'items'
      },
      loading: false,
      content: null,
      project_id: null,
      catalog_id: null,
      item_id: null
    }
  },
  components: {
    LeftMenu,
    Preview,
    RightMenu
  },
  mounted() {
    if (this.$route.query.id) {
      this.project_id = this.$route.query.id
      this.loading = true
      projectDetail(this.$route.query.id).then(res => {
        this.apiList = res.data
        this.loading = false
      })
    }
  },
  methods: {
    handleNodeClick(data, node) {
      const that = this
      if (data.type === 'api') {
        that.loading = true
        this.catalog_id = node.parent.id
        this.item_id = data.id
        apiDetail(data.id).then(res => {
          that.content = res.data.markdown
          that.loading = false
        })
      }
    },
    editContent() {
      this.$router.push({
        name: 'Project Edit',
        params: {
          project_id: this.project_id,
          catalog_id: this.catalog_id,
          item_id: this.item_id,
          content: this.content
        }
      })
    }
  }
}
</script>

<style>
.el-row {
  padding: 20px;
}
</style>
