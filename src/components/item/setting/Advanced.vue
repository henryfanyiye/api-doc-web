<template>
  <div class='hello'>
    <p style='height:40px;'></p>
    <p>
      <el-tooltip :content="$t('attorn_tips')" placement='top-start'>
        <el-button class='a_button' @click='dialogAttornVisible = true'>{{ $t('attorn') }}</el-button>
      </el-tooltip>
    </p>

    <p>
      <el-tooltip :content="$t('delete_tips')" placement='top-start'>
        <el-button class='a_button' @click='dialogDeleteVisible = true'>{{ $t('delete') }}</el-button>
      </el-tooltip>
    </p>

    <el-dialog
        :visible.sync='dialogAttornVisible'
        :modal='false'
        width='300px'
        :close-on-click-modal='false'
    >
      <el-form>
        <el-form-item label>
          <el-input :placeholder="$t('attorn_username')" v-model='attornForm.username'></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input
              type='password'
              :placeholder="$t('input_login_password')"
              v-model='attornForm.password'
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='dialogAttornVisible = false'>{{ $t('cancel') }}</el-button>
        <el-button type='primary' @click='attorn'>{{ $t('attorn') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
        :visible.sync='dialogDeleteVisible'
        :modal='false'
        width='300px'
        :close-on-click-modal='false'
    >
      <el-form>
        <el-form-item label>
          <el-input
              type='password'
              :placeholder="$t('input_login_password')"
              v-model='deleteForm.password'
          >>
          </el-input>
        </el-form-item>
      </el-form>

      <p class='tips'>
        <el-tag type='danger'>{{ $t('delete_tips') }}</el-tag>
      </p>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='dialogDeleteVisible = false'>{{ $t('cancel') }}</el-button>
        <el-button type='primary' @click='deleteItem'>{{ $t('delete') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { checkPwd, deleteProject, attornProject } from '@/api/api'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      dialogAttornVisible: false,
      dialogDeleteVisible: false,
      attornForm: {
        username: '',
        password: ''
      },
      deleteForm: {
        password: ''
      }
    }
  },
  methods: {
    deleteItem() {
      const that = this
      checkPwd({ password: this.deleteForm.password }).then(() => {
        return deleteProject(that.$route.params.item_id)
      }).then(() => {
        that.dialogDeleteVisible = false
        that.$message.success(that.$t('success_jump'))
        setTimeout(function() {
          that.$router.push({ path: '/item/index' })
        }, 1000)
      }).catch(err => {
        that.$alert(err.msg)
      })
    },
    attorn() {
      const that = this
      checkPwd({ password: this.attornForm.password }).then(() => {
        return attornProject({
          pid: that.$route.params.item_id,
          username: this.attornForm.username
        })
      }).then(() => {
        that.dialogAttornVisible = false
        that.$message.success(that.$t('success_jump'))
        setTimeout(function() {
          that.$router.push({ path: '/item/index' })
        }, 1000)
      }).catch(err => {
        that.$alert(err.msg)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.a_button {
  width: 30%;
}

.a_button:first-child {
  margin-top: 30px;
}
</style>
