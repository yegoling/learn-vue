import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getCategoryFilterAPI } from '@/apis/category'

export const useCategoryFilter = () => {
  const route = useRoute()
  const CategoryFilter = ref({})

  const getCategoryFilter = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    CategoryFilter.value = res.result
  }
  getCategoryFilter()
  return {
    CategoryFilter
  }
}
