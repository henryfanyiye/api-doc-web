<template>
  <div class='env-container'>
    <el-table :data='tableData' border v-loading='loading'>
      <el-table-column prop='name' label='Name' width='200' />
      <el-table-column label='Value'>
        <template slot-scope='scope'>
          <el-popover trigger='hover' placement='top'>
            <p>{{ scope.row.value }}</p>
            <div slot='reference'>
              {{ scope.row.value }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop='value' label='Operating' width='300'>
        <template slot-scope='scope'>
          <el-button type='info' size='small' icon='el-icon-view' @click='detail(scope.row.id,"view")' round>View
          </el-button>
          <el-button type='primary' size='small' icon='el-icon-edit' @click='detail(scope.row.id,"edit")' round>Edit
          </el-button>
          <el-popconfirm
              class='btn-remove'
              confirm-button-text='Yes'
              cancel-button-text='No'
              icon='el-icon-info'
              icon-color='red'
              title='Are you sure you want to delete the variable?'
              @onConfirm='remove(scope.row.id)'
          >
            <el-button slot='reference' type='danger' size='small' icon='el-icon-delete' round>Delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { list, remove } from '@/api/environment'

export default {
  name: 'Environment',
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      list().then(res => {
        this.tableData = res.data
        this.loading = false
      })
    },
    detail(id, type) {
      this.$router.push({ name: 'Environment Detail', query: { id, type } })
    },
    remove(id) {
      this.loading = true
      remove(id).then(() => {
        this.getList()
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
