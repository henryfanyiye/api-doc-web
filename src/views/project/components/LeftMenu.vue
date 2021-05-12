<template>
  <el-tree
      :data='apiList'
      ref='tree'
      :props='defaultProps'
      node-key='id'
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
</template>

<script>

export default {
  name: 'LeftMenu',
  data() {
    return {
      defaultProps: {
        label: 'name',
        type: 'type',
        children: 'items'
      }
    }
  },
  props: {
    apiList: Array,
    handleNodeClick: Function
  }
}
</script>
