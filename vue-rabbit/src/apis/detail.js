import httpInstance from '@/utils/http'

export const getDetailApi = (id) => {
  return httpInstance({
    url: '/goods',
    params: {
      id
    }
  })
}

export const getHotGoodsApi = ({ id, type, limit = 3 }) => {
  return httpInstance({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}
