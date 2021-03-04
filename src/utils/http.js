import axios from 'axios'
import { Message } from 'element-ui'    // 这里我是使用elementUI的组件来给提示
import router from '@/router/index'

const instance = axios.create({    //创建axios实例，在这里可以设置请求的默认配置
  timeout: 10000, // 设置超时时间10s
  baseURL: 'http://127.0.0.1:4000'   //根据自己配置的反向代理去设置不同环境的baeUrl
})

// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
instance.defaults.headers.post['Content-Type'] = 'application/json'

let httpCode = {        //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
}

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (user) config.headers['Authorization'] = 'Bearer ' + user.accessToken
  if (config.method === 'get') { // 添加时间戳参数，防止浏览器（IE）对get请求的缓存
    config.params = {
      ...config.params,
      t: new Date().getTime()
    }
  }
  if (config.url.includes('api/postman/upload')) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
  return Promise.resolve(response.data)
}, error => {
  if (error.response) {
    // 根据请求失败的http状态码去给用户相应的提示
    let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.msg
    Message({
      message: tips,
      type: 'error'
    })
    if (error.response.status === 401) {
      router.push({
        path: `/user/login`
      })
    }
    return Promise.reject(error.response.data)
  } else {
    Message({
      message: '请求超时, 请刷新重试',
      type: 'error'
    })
    return Promise.reject(new Error('请求超时, 请刷新重试'))
  }
})

export default instance
