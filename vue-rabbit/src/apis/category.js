import httpInstance from '@/utils/http'
export const getCategoryApi = (id) => {
  return httpInstance({
    url: '/category',
    params: {
      id
    }
  })
}

export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}
export const getBaseListApi = (data) => {
  return httpInstance({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}
