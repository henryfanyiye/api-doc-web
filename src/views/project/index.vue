<template>
  <div class='project-container'>
    <el-row :gutter='24' v-loading='loading'>
      <el-col :xs='12' :sm='12' :lg='6' class='card-panel-col' v-for='item in projectList' :key='item.projectId'>
        <el-card shadow='hover' class='box-card'>
          <i class='el-icon-setting item-setting' @click='goSetting(item.projectId)'></i>
          <i class='el-icon-lock item-private' v-if='item.private'></i>
          <div @click='toProjectDetail(item.projectId)'>
            <h3>{{ item.projectName }}</h3>
          </div>
        </el-card>
      </el-col>
      <el-col :xs='12' :sm='12' :lg='6' class='card-panel-col'>
        <el-card shadow='hover' class='box-card'>
          <div @click='toCreateProject'>
            <h3>New +</h3>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { projectList } from '@/api/user'

export default {
  name: 'Project',
  data() {
    return {
      currentDate: new Date(),
      projectList: [],
      action: process.env.VUE_APP_BASE_API + '/api/postman/upload',
      headers: {
        'Authorization': ''
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  beforeMount() {
    this.getProjectList()
  },
  methods: {
    getProjectList() {
      this.loading = true
      projectList(0).then(res => {
        this.projectList = res.data
        this.loading = false
      })
    },
    toProjectDetail(id) {
      this.$router.push({ name: 'Project Detail', query: { id } })
    },
    toCreateProject() {
      this.$router.push({ name: 'Project Create' })
    },
    addHeaders() {
      this.headers.Authorization = 'Bearer ' + this.token
    },
    goSetting(id) {
      this.$router.push({ name: 'Project Setting', query: { id } })
    }
  }
}
</script>

<style lang='scss' scoped>
.project-container {
  padding: 32px;
  position: relative;
}

.card-panel-col {
  margin-bottom: 32px;
}

.box-card {
  position: relative;
  width: 90%;
  text-align: center;
  cursor: pointer;
}

.item-setting {
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
}

.item-private {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: none;
}

.box-card:hover .item-setting {
  display: block;
}

.box-card:hover .item-private {
  display: block;
}

</style>
