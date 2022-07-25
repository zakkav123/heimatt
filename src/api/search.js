import request from '@/utils/request'

export const getSearchJy = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchList = (params) => {
  return request({
    url: '/v1_0/search',
    params
  })
}
