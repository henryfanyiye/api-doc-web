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
        <el-radio v-model='isOpenItem' :label='true'>{{ $t('Open_item') }}</el-radio>
        <el-radio v-model='isOpenItem' :label='false'>{{ $t('private_item') }}</el-radio>
      </el-form-item>

      <el-form-item v-show='!isOpenItem'>
        <el-input
            type='password'
            auto-complete='off'
            v-model='infoForm.password'
            :placeholder="$t('visit_password')"
        ></el-input>
      </el-form-item>

      <el-form-item label>
        <el-button type='primary' style='width:100%;' @click='FormSubmit'>{{ $t('submit') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      infoForm: {},
      isOpenItem: true
    }
  },
  methods: {
    get_item_info() {
      const that = this
      const url = DocConfig.server + `/api/project/project/${that.$route.params.item_id}`
      const user = JSON.parse(localStorage.getItem('userinfo'))
      that.axios({
        method: 'GET',
        url,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.accessToken
        }
      }).then(response => {
        if (response.data.code === 0) {
          that.infoForm = response.data.data
          that.isOpenItem = response.data.data.is_private
        } else {
          that.$alert(response.data.msg)
        }
      }).catch(function(error) {
        console.log(error)
      })
    },
    FormSubmit() {
      const that = this
      const url = DocConfig.server + `/api/project/project/update/${that.$route.params.item_id}`
      const user = JSON.parse(localStorage.getItem('userinfo'))
      if (!this.isOpenItem && !this.infoForm.password) {
        that.$alert(that.$t('private_item_passwrod'))
        return false
      }
      if (this.isOpenItem) {
        this.infoForm.password = ''
      }
      that.axios({
        method: 'POST',
        url,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.accessToken
        },
        data: JSON.stringify({
          is_private: this.isOpenItem,
          password: this.infoForm.password
        })
      }).then(function(response) {
        if (response.data.code === 0) {
          that.$message.success(that.$t('modify_success'))
        } else {
          that.$alert(response.data.msg)
        }
      }).catch(function(error) {
        console.log(error)
      })
    }
  },

  mounted() {
    this.get_item_info()
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
