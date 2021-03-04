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

const del = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
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

/**
 * User
 * - Login
 * - Detail
 * - Project list
 */
export const login = (data, config = {}) => post('/api/user/login', data, config)
export const detail = () => get('/api/user/detail')
export const projectList = () => get('/api/user/project/list')
export const checkPwd = (data) => post('/api/user/password/check', data)

/**
 * Project
 * - Query info
 * - Create new project
 * - Update project
 * - Delete project
 */
export const projectInfo = (id) => get(`/api/project/project/${id}`)
export const createProject = (data) => post('/api/project/project/add', data)
export const updateProject = (id, data) => post(`/api/project/project/update/${id}`, data)
export const deleteProject = (id) => del(`/api/project/project/${id}`)
export const attornProject = (data) => post('/api/project/project/attorn', data)
export const projectAll = (id) => get(`/api/project/${id}`)
