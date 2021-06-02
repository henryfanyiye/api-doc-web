<template>
  <el-form ref='form' :model='form' label-width='80px' label-position='left'>
    <el-form-item label='Name'>
      <el-input size='mini' v-model='form.project_name'></el-input>
    </el-form-item>
    <el-form-item label='Private'>
      <el-radio-group v-model='form.is_private'>
        <el-radio label='True'></el-radio>
        <el-radio label='False'></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label='Desc'>
      <el-input type='textarea' v-model='form.description'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type='primary' @click='onSubmit'>Save</el-button>
      <el-button @click='goBack'>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { projectInfo, updateProject } from '@/api/project'

export default {
  name: 'Basic',
  data() {
    return {
      project_id: null,
      form: {
        project_name: '',
        is_private: 'False',
        description: ''
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.project_id = this.$route.query.id
      projectInfo(this.$route.query.id).then(res => {
        this.form = {
          project_name: res.data.project_name,
          is_private: res.data.is_private ? 'True' : 'False',
          description: res.data.description
        }
      })
    }
  },
  methods: {
    onSubmit() {
      const that = this
      const data = Object.assign({}, that.form, { is_private: that.form.is_private === 'True' })
      updateProject(that.project_id, data)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
