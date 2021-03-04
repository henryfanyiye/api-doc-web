<template>
</template>

<script>
import { detail } from '@/api/api'

export default {
  name: 'Index',
  data() {
    return {
      height: '',
      lang: ''
    }
  },
  methods: {
    getHeight() {
      let winHeight
      if (window.innerHeight) {
        winHeight = window.innerHeight
      } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight
      }
      this.height = winHeight + 'px'
    }
  },
  mounted() {
    this.lang = DocConfig.lang
    this.getHeight()
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (user) {
      detail().then(() => {
        // 跳转项目列表页
        this.$router.replace({
          path: '/item/index'
        })
      }).catch(() => {
        localStorage.clear()
        // 跳转到登录页面
        this.$router.replace({
          path: '/user/login'
        })
      })
    }
    this.$router.replace({
      path: '/user/login'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src='@/../static/css/qietu.css'></style>
<style scoped src='@/../static/css/style.css'></style>
<style scoped src='@/../static/css/responsive.css'></style>
