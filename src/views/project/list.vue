<template>
  <el-tree
      :data='data'
      :props='defaultProps'
      :highlight-current='true'
      accordion
      @node-click='handleNodeClick'>
  </el-tree>
</template>

<script>
export default {
  name: 'ProjectDetail',
  data() {
    return {
      data: [],
      defaultProps: {
        label: 'name',
        children: 'items'
      }
    }
  },
  beforeMount() {
    this.$store.dispatch('project/detail', this.$route.query.id).then(res => {
      this.data = res
    })
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>
