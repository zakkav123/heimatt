import request from '@/utils/request'

export const getNewsDetails = (actived) => {
  return request({
    url: '/v1_0/articles/' + actived
  })
}

export const getCommentsList = (source, offset, limit) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source,
      offset,
      limit
    }
  })
}
export const getCommentsCommentsList = (source) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: 'c',
      source
    }
  })
}

// 基本信息

export const getLikingsList = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消点赞
export const getLikingsTargetList = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

// 收藏文章

export const getCollectionsList = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消收藏
export const getRemoLikingsList = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}

// 评论文章

export const goComments = (target, content) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content
    }
  })
}
// 点赞评论
export const commentLikings = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消点赞评论
export const commentLikingsTarget = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE',
    data: {
      target
    }
  })
}

// 关注用户

export const userFollowings = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消关注
export const userFollowingsFarget = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
