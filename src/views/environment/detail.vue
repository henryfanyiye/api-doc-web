<template>
  <div class='env-container'>
    <el-table :data='tableData' border v-loading='loading' v-if='type==="view"'>
      <el-table-column prop='key' label='Name'>
      </el-table-column>
      <el-table-column prop='type' label='Type'>
      </el-table-column>
      <el-table-column prop='value' label='Value'>
      </el-table-column>
    </el-table>

    <el-table :data='tableData' border v-loading='loading' v-if='type==="edit"'>
      <el-table-column prop='key' label='Name'>
        <template slot-scope='scope'>
          <el-input v-model='scope.row.key' type='string'></el-input>
        </template>
      </el-table-column>
      <el-table-column prop='type' label='Type'>
        <template slot-scope='scope'>
          <el-input v-model='scope.row.type' type='string'></el-input>
        </template>
      </el-table-column>
      <el-table-column prop='value' label='Value'>
        <template slot-scope='scope'>
          <el-input v-model='scope.row.value' type='string'></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { detail } from '@/api/environment'

export default {
  name: 'EnvironmentDetail',
  data() {
    return {
      type: 'view',
      tableData: [],
      loading: false,
      id: null
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.getDetail(this.id)
  },
  methods: {
    getDetail(id) {
      detail(id).then(res => {
        this.tableData = res.data.env_value
      })
    }
  }
}
</script>

<style>
.env-container {
  padding: 20px;
}

.btn-remove {
  margin-left: 10px;
}
</style>
