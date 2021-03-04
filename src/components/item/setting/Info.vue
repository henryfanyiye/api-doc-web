<template>
  <div class='hello'>
    <el-form status-icon label-width='100px' class='infoForm' v-model='infoForm'>
      <el-form-item>
        <el-input type='text' auto-complete='off' v-model='infoForm.project_name' placeholder></el-input>
      </el-form-item>

      <el-form-item>
        <el-input
            type='text'
            auto-complete='off'
            v-model='infoForm.description'
            :placeholder="$t('item_description')"
        ></el-input>
      </el-form-item>

      <el-form-item label>
        <el-button type='primary' style='width:100%;' @click='FormSubmit'>{{ $t('submit') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { projectInfo, updateProject } from '@/api/api'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      infoForm: {}
    }
  },
  methods: {
    getProjectInfo() {
      const that = this
      projectInfo(that.$route.params.item_id).then(res => {
        that.infoForm = res
      }).catch(err => {
        that.$alert(err.msg)
      })
    },
    FormSubmit() {
      const that = this
      updateProject(
          that.$route.params.item_id,
          { project_name: this.infoForm.project_name, description: this.infoForm.description }
      ).then(() => {
        that.$message.success(that.$t('modify_success'))
      }).catch(err => {
        that.$alert(err.msg)
      })
    }
  },

  mounted() {
    this.getProjectInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center-card a {
  font-size: 12px;
}

.center-card {
  text-align: center;
  width: 600px;
  height: 500px;
}

.infoForm {
  width: 350px;
  margin-left: 20px;
  margin-top: 60px;
}

.goback-btn {
  z-index: 999;
  margin-left: 500px;
}
</style>
