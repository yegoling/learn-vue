import httpInstance from '@/utils/http'

export const getCategoryApi = () => {
  return httpInstance({
    url: '/home/category/head'
  })
}

// export const getBannerApi = (params) => {
//   return httpInstance({
//     url: '/home/banner',
//     params
//   })
// }

export const getBannerApi = (params = {}) => {
  // 默认为1 商品为2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

export const getNewApi = (params) => {
  return httpInstance({
    url: '/home/new',
    params
  })
}

export const getHotApi = (params) => {
  return httpInstance({
    url: '/home/hot',
    params
  })
}

export const getGoodsProduct = () => {
  return httpInstance({
    url: '/home/goods'
  })
}
