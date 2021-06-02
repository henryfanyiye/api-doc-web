<template>
  <div class='register-container'>
    <el-form :model='ruleForm' status-icon :rules='rules' ref='ruleForm' label-width='100px' class='demo-ruleForm'>
      <el-form-item label='昵称' prop='nickname'>
        <el-input v-model='ruleForm.nick_name'></el-input>
      </el-form-item>
      <el-form-item label='用户名' prop='username'>
        <el-input v-model='ruleForm.username'></el-input>
      </el-form-item>
      <el-form-item label='邮箱' prop='email'>
        <el-input type='email' v-model='ruleForm.email'></el-input>
      </el-form-item>
      <el-form-item label='密码' prop='password'>
        <el-input type='password' v-model='ruleForm.password' autocomplete='off'></el-input>
      </el-form-item>
      <el-form-item label='确认密码' prop='checkPassword'>
        <el-input type='password' v-model='ruleForm.checkPassword' autocomplete='off'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.ruleForm.checkPassword !== '') {
        this.$refs.ruleForm.validateField('checkPassword')
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        nick_name: '',
        username: '',
        email: '',
        password: '',
        checkPassword: '',
        avatar: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 24, message: '长度在 8 到 24 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 24, message: '长度在 8 到 24 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 8, max: 24, message: '长度在 8 到 24 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      register(this.ruleForm).then(() => {
        this.$router.push({ name: 'Login' })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.register-container {
  width: 30%;
  margin: 40px auto;
}
</style>
