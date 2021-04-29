import { projectDetail, apiDetail } from '@/api/project'

const actions = {
  // Project api list
  async projectDetail({}, id) {
    return await projectDetail(id).then(response => {
      const { data } = response
      return data
    })
  },

  async apiDetail({}, id) {
    return await apiDetail(id).then(response => {
      const { data } = response
      return data
    })
  }
}

export default {
  namespaced: true,
  actions
}
