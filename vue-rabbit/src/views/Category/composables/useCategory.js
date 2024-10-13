import { ref } from 'vue'
import { getCategoryApi } from '@/apis/category'
import { useRoute } from 'vue-router'
export const useCategory = () => {
  const CategoryList = ref({})
  const getCategoryList = async () => {
    const route = useRoute()
    const res = await getCategoryApi(route.params.id)
    CategoryList.value = res.result
  }
  getCategoryList()
  return {
    CategoryList
  }
}
