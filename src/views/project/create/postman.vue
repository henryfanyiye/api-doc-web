<template>
  <el-upload
      drag
      :headers='headers'
      :action='action'
      :multiple='false'
      :show-file-list='false'
      :before-upload='addHeaders'
      :on-success='goBack'
  >
    <i class='el-icon-upload'></i>
    <div class='el-upload__text'>将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Postman',
  data() {
    return {
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
  methods: {
    goBack() {
      this.$router.go(-1)
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
