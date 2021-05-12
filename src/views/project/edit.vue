<template>
  <el-row :gutter='20' v-loading='loading'>
    <el-col :span='24'>
      <VditorEdit ref='edit' :content='content' :save='save' />
    </el-col>
  </el-row>
</template>

<script>
import VditorEdit from './components/VditorEdit'
import { updateItem } from '@/api/project'

export default {
  name: 'ProjectEdit',
  data() {
    return {
      data: [],
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
    VditorEdit
  },
  mounted() {
    this.content = this.$route.params.content || ''
    this.project_id = this.$route.params.project_id || ''
    this.catalog_id = this.$route.params.catalog_id || ''
    this.item_id = this.$route.params.item_id || ''
  },
  methods: {
    save() {
      this.loading = true
      this.content = this.$refs.edit.contentEditor.getValue()
      sessionStorage.setItem('content', this.content)
      updateItem(this.item_id, { markdown: this.content }).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>
.el-row {
  padding: 30px 10px 10px 10px;
}
</style>
