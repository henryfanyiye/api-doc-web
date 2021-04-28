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
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Project',
  data() {
    return {
      currentDate: new Date(),
      projectList: []
    }
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
      this.$router.push({ name: 'ProjectDetail', query: { id } })
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
</style>
