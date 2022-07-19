import request from '@/utils/request'
import storage from '@/utils/storage'

export const getChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const delAllChannels = (target) => {
  return request({
    url: `/v1_0/channels/${target}`,
    method: 'DELETE'
  })
}
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

const HEIMA_TT_TOKE = 'HEIMA_TT_TOKE'
export const getMyChannels = () => {
  return storage.get(HEIMA_TT_TOKE)
}
export const setMyChannels = (channel) => storage.set(HEIMA_TT_TOKE, channel)
