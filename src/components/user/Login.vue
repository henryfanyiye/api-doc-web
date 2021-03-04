<template>
  <div class='hello'>
    <Header></Header>

    <el-container>
      <el-card class='center-card'>
        <el-form status-icon label-width='0px' class='demo-ruleForm' @keyup.enter.native='onSubmit'>
          <h2>{{ $t('login') }}</h2>
          <el-form-item label>
            <el-input
                type='text'
                auto-complete='off'
                :placeholder="$t('username_description')"
                v-model='username'
            ></el-input>
          </el-form-item>

          <el-form-item label>
            <el-input
                type='password'
                auto-complete='off'
                v-model='password'
                :placeholder="$t('password')"
            ></el-input>
          </el-form-item>

          <el-form-item label v-if='show_v_code'>
            <el-input
                type='text'
                auto-complete='off'
                v-model='v_code'
                :placeholder="$t('verification_code')"
            ></el-input>
            <img v-bind:src='v_code_img' class='v_code_img' v-on:click='change_v_code_img' />
          </el-form-item>

          <el-form-item label>
            <el-button type='primary' style='width:100%;' @click='onSubmit'>{{ $t('login') }}</el-button>
          </el-form-item>

          <el-form-item label>
            <router-link to='/user/register'>{{ $t('register_new_account') }}</router-link>&nbsp;&nbsp;&nbsp;
          </el-form-item>
        </el-form>
      </el-card>
    </el-container>

    <Footer></Footer>
  </div>
</template>

<script>
import { login, detail } from '@/api/api'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      username: '',
      password: '',
      v_code: '',
      v_code_img: DocConfig.server + '/api/common/verify',
      show_v_code: false,
      is_show_alert: false
    }
  },
  methods: {
    onSubmit() {
      if (this.is_show_alert) {
        return
      }
      // this.$message.success(this.username);
      const that = this
      login({ username: that.username, password: that.password }).then(function(response) {
        // that.$message.success("登录成功");
        localStorage.setItem('userInfo', JSON.stringify(response))
        let redirect = decodeURIComponent(
            that.$route.query.redirect || '/item/index'
        )
        that.$router.replace({
          path: redirect
        })
      }).catch(err => {
        that.is_show_alert = true
        that.$alert(err.msg, {
          callback: function() {
            setTimeout(function() {
              that.is_show_alert = false
            }, 500)
          }
        })
      })
    },
    change_v_code_img() {
      const rand = '&rand=' + Math.random()
      this.v_code_img += rand
    }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (user) {
      detail().then(() => {
        this.$router.replace({
          path: '/item/index'
        })
      }).catch(() => {
        localStorage.clear()
      })
    }
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
}

.v_code_img {
  margin-top: 20px;
}
</style>
