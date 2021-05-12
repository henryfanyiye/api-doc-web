import request from '@/utils/request'

export function projectDetail(id) {
  return request({
    url: `/api/project/project/${id}`,
    method: 'get'
  })
}

export function apiDetail(id) {
  return request({
    url: `/api/project/item/${id}`,
    method: 'get'
  })
}

export function updateItem(id, data) {
  return request({
    url: `/api/project/item/update/${id}`,
    method: 'post',
    data
  })
}
