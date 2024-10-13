import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBannerApi } from '@/apis/layout'

export const useBannerStore = defineStore('banner', () => {
  const BannerList = ref([])
  const getBanner = async () => {
    // 切不能写成 categoryList.value= await getCategoryApi().result  !!!
    const res = await getBannerApi()
    BannerList.value = res.result
    // console.log(categoryList.value)
  }
  return {
    BannerList,
    getBanner
  }
})
