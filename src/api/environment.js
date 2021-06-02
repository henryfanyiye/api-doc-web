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

export function edit(data) {
  return request({
    url: `/api/environment/edit`,
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/api/environment/${id}`,
    method: 'delete'
  })
}

