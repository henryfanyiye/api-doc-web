import request from '@/utils/request'

export function detail(id) {
  return request({
    url: `/api/project/project/${id}`,
    method: 'get'
  })
}
