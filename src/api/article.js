import request from '@/utils/request'

// 文章分类相关
export const artGetChannelsService = () => request.get('/my/cate/list')

export const artAddChannelsService = (data) =>
  request.post('/my/cate/add', data)

export const artEditChannelsService = (data) =>
  request.put('/my/cate/info', data)

export const artDelChannelsService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章列表相关
export const artGetListService = (params) =>
  request.get('/my/cate/list', { params })
