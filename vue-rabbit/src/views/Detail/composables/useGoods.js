import { ref } from 'vue'
import { getDetailApi } from '@/apis/detail'

export const useGoods = async (id) => {
  const Goods = ref({})
  const res = await getDetailApi(id)
  Goods.value = res.result
  console.log(Goods.value)
  return Goods.value
}
