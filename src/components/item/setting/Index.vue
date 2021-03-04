<template>
  <div class='hello'>
    <Header></Header>

    <el-container>
      <el-card class='center-card'>
        <template>
          <el-button type='text' @click='goback' class='goback-btn'>
            <i class='el-icon-back'></i>
          </el-button>
          <el-tabs value='first' type='card'>
            <el-tab-pane :label="$t('base_info')" name='first'>
              <Info></Info>
            </el-tab-pane>

            <el-tab-pane :label="$t('member_manage')" name='second'>
              <Member></Member>
            </el-tab-pane>

            <el-tab-pane :label="$t('advance_setting')" name='third'>
              <Advanced></Advanced>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-card>
    </el-container>

    <Footer></Footer>
  </div>
</template>

<script>
import Info from '@/components/item/setting/Info'
import Member from '@/components/item/setting/Member'
import Advanced from '@/components/item/setting/Advanced'

export default {
  name: 'Login',
  components: {
    Info,
    Member,
    Advanced
  },
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
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
  width: 555px;
  min-height: 600px;
  max-height: 800px;
}

.infoForm {
  width: 350px;
  margin-left: 60px;
  margin-top: 30px;
}

.goback-btn {
  z-index: 999;
  font-size: 18px;
  margin-right: 800px;
  margin-bottom: 5px;
}
</style>
