<template>
  <div class='env-container'>
    <el-table :data='obj.tableData' border v-loading='loading' v-if='type==="view"'>
      <el-table-column prop='key' label='Name'>
      </el-table-column>
      <el-table-column prop='type' label='Type'>
      </el-table-column>
      <el-table-column prop='value' label='Value'>
      </el-table-column>
    </el-table>

    <el-form :model='obj' ref='tableData'>
      <el-table :data='obj.tableData' border v-loading='loading' v-if='type==="edit"'>
        <el-table-column prop='key' label='Name'>
          <template slot-scope='scope'>
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'key'">
              <el-input v-model='scope.row.key' type='string'></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop='type' label='Type'>
          <template slot-scope='scope'>
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'type'">
              <el-input v-model='scope.row.type' type='string'></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop='value' label='Value'>
          <template slot-scope='scope'>
            <el-form-item :prop="'tableData.' + scope.$index + '.' + 'value'">
              <el-input v-model='scope.row.value' type='string'></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop='value' label='Operating'>
          <template slot-scope='scope'>
            <el-form-item :prop="'tableData.' + scope.$index">
              <el-button icon='el-icon-close' type='danger' size='mini' circle @click='remove(scope.$index)' />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <el-row style='padding-top: 10px'>
      <el-button type='info' round @click='goBack'>Back</el-button>
      <el-button type='primary' round v-if='type==="edit"' @click='save'>Save</el-button>
    </el-row>
  </div>
</template>

<script>
import { detail, edit } from '@/api/environment'

export default {
  name: 'EnvironmentDetail',
  data() {
    return {
      type: 'view',
      obj: {
        tableData: []
      },
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
        this.obj.tableData = res.data.env_value
        this.obj.tableData.push({ key: null, type: null, value: null })
      })
    },
    remove(index) {
      console.log(index)
      this.obj.tableData.splice(index, 1)
      console.log(this.obj.tableData)
    },
    goBack() {
      this.$router.go(-1)
    },
    save() {
      console.log(this.obj.tableData)
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
