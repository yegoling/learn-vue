import { ref } from 'vue'
import { getBannerApi } from '@/apis/layout'

export const useBanner = () => {
  const BannerList = ref([])
  const getBannerList = async () => {
    const res = await getBannerApi()
    BannerList.value = res.result
  }
  getBannerList()
  return {
    BannerList
  }
}
