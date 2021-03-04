// 每个模块都应该有自己的接口文件去统一管理api
import axios from '@/utils/http'

const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url,
      params,
      ...config
    }).then(res => {
      if (res.code === 0) {
        return resolve(res.data || true)
      } else {
        return reject(res)
      }
    }).catch(err => {
      return reject(err)
    })
  })
}

const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url,
      data,
      ...config
    }).then(res => {
      if (res.code === 0) {
        return resolve(res.data || true)
      } else {
        return reject(res)
      }
    }).catch(err => {
      return reject(err)
    })
  })
}

/**
 * User
 * - Login
 * - Detail
 * - Project list
 */
export const login = (data, config = {}) => post('/api/user/login', data, config)
export const detail = (params, config = {}) => get('/api/user/detail', params, config)
export const projectList = (params, config = {}) => get('/api/user/project/list', params, config)
