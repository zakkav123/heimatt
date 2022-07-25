import request from '@/utils/request'
// import store from '@/store'

export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: 'v1_0/authorizations',
    data: { mobile, code }
  })
}

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}

export const changeName = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data: data
  })
}

export const getUserInfos = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

export const updateUserAvatar = (photo) => {
  return request({
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/v1_0/user/photo',
    data: {
      photo
    }
  })
}
