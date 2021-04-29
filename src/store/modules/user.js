import { login, logout, detail, projectList } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    return await login({
      username: username.trim(),
      password: password
    }).then(response => {
      const { data } = response
      commit('SET_TOKEN', data.accessToken)
      setToken(data.accessToken)
    })
  },

  // get user info
  async detail({ commit }) {
    return await detail().then(response => {
      const { data } = response

      if (!data) {
        return Promise.reject('Verification failed, please Login again.')
      }

      const { name, avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' } = data

      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      return data
    })
  },

  // get project list
  async projectList({}, is_delete) {
    return await projectList(is_delete).then(response => {
      const { data } = response
      return data
    })
  },

  // user logout
  async logout({ commit }) {
    return await logout().then(() => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
