<template>
  <div class='project-container'>
    <el-row :gutter='24'>
      <el-col :xs='12' :sm='12' :lg='6' class='card-panel-col' v-for='item in projectList' :key='item.projectId'>
        <div class='box-card' @click='toProjectDetail(item.projectId)'>
          <el-card>
            <h1>{{ item.projectName }}</h1>
          </el-card>
        </div>
      </el-col>
      <el-col :xs='12' :sm='12' :lg='6' class='card-panel-col'>
        <el-upload
            list-type='picture-card'
            :headers='headers'
            :action='action'
            :multiple='false'
            :show-file-list='false'
            :before-upload='addHeaders'
            :on-success='getProjectList'
        >
          <i slot='default' class='el-icon-plus'></i>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Project',
  data() {
    return {
      currentDate: new Date(),
      projectList: [],
      action: process.env.VUE_APP_BASE_API + '/api/postman/upload',
      headers: {
        'Authorization': ''
      }
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
      this.$store.dispatch('user/projectList', 0).then(data => {
        this.projectList = data
      })
    },
    toProjectDetail(id) {
      this.$router.push({ name: 'Project Detail', query: { id } })
    },
    addHeaders() {
      this.headers.Authorization = 'Bearer ' + this.token
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
  width: 90%;
  text-align: center;
  cursor: pointer;
}

el-upload {
  width: 100%;
}
</style>
