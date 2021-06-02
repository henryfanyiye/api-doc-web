<template>
  <div>
    <el-button type='warning'>Transfer</el-button>
    <el-button type='danger' @click='remove'>Delete</el-button>
  </div>
</template>
<script>
import { deletePeoject } from '@/api/project'

export default {
  name: 'Advanced',
  data() {
    return {
      project_id: null
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.project_id = this.$route.query.id
    }
  },
  methods: {
    remove() {
      deletePeoject(this.project_id).then(() => {
        this.$router.go(-1)
      })
    }
  }
}
</script>
