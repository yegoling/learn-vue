import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoryApi } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])
  const getCategory = async () => {
    // 切不能写成 categoryList.value= await getCategoryApi().result  !!!
    const res = await getCategoryApi()
    categoryList.value = res.result
    console.log(categoryList.value)
  }
  return {
    categoryList,
    getCategory
  }
})
