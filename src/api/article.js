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
// 获取文章列表
export const artGetListService = (params) =>
  request.get('/my/cate/list', { params })

// 添加文章
export const artPublishService = (data) => request.post('/my/article/add', data)

// 获取文章详情
export const artGetDetailService = (id) =>
  request.get('/my/article/info', {
    params: { id }
  })

// 编辑文章
export const artEditService = (data) => request.put('/my/article/info', data)

//删除文章
export const artDelService = (id) =>
  request.delete('my/article/info', { params: { id } })
