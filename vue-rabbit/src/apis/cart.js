import httpInstance from '@/utils/http'

export const insertCartApi = ({ skuId, count }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}
export const findNewCartListApi = () => {
  return httpInstance({
    url: '/member/cart'
  })
}
export const delCartApi = (ids) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

export const mergeCartApi = (data) => {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'post',
    data
  })
}

// 创建订单
export const createOrderApi = (data) => {
  return httpInstance({
    url: '/member/order',
    method: 'POST',
    data
  })
}
