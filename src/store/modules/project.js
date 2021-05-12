const getDefaultState = () => {
  return {
    content: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_CONTENT: (state, content) => {
    state.content = content
  }
}

const actions = {
  async setContent({ commit }, content) {
    console.log(content)
    commit('SET_CONTENT', content)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
