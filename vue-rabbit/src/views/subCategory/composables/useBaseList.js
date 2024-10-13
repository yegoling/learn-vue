import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getBaseListApi } from '@/apis/category'

export const useBaseList = () => {
  const route = useRoute()
  const BaseList = ref({
    category: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
  })
  const getBaseList = async () => {
    const res = await getBaseListApi(BaseList.value) //数据要传进去
    // console.log(res)
    BaseList.value = res.result.items
  }

  getBaseList()

  return {
    BaseList
  }
}
