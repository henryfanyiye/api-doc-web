import request from '@/utils/request'

export function list() {
  return request({
    url: `/api/environment/list`,
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: `/api/environment/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: `/api/environment/create`,
    method: 'post',
    data
  })
}

