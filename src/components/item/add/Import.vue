<template>
  <div class='hello'>
    <p class='tips'>
      <span v-html="$t('import_file_tips1')"></span>
    </p>

    <p>
      <el-upload
          class='upload-demo'
          drag
          name='file'
          :action='upload_url'
          :headers='headers'
          :on-success='success'
          :on-error='error'
          :before-upload='beforeUpload'
          :show-file-list='false'
      >
        <i class='el-icon-upload'></i>
    <div class='el-upload__text'>
      <span v-html="$t('import_file_tips2')"></span>
    </div>
    </el-upload>
    </p>
  </div>
</template>

<script>
import { upload } from '@/api/api'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loading: '',
      upload_url: DocConfig.server + '/api/postman/upload',
      headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).accessToken }
    }
  },
  methods: {
    success() {
      this.loading.close()
      this.$router.push({ path: '/item/index' })
    },
    error() {
      this.loading.close()
    },
    beforeUpload() {
      this.loading = this.$loading()
    }
  },

  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: left;
  margin-left: 10px;
  margin-top: 30px;
}

.tips {
  margin-left: 5px;
  margin-bottom: 20px;
  color: #9ea1a6;
  padding: 10px;
}
</style>
