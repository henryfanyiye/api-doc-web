import { detail } from '@/api/project'

const actions = {
  // Project api list
  async detail({}, id) {
    return await detail(id).then(response => {
      const { data } = response
      return data
    })
  }
}

export default {
  namespaced: true,
  actions
}
