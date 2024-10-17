import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi } from '@/apis/user'
import { useCartStore } from './CartStore'
import { mergeCartApi, findNewCartListApi } from '@/apis/cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const CartStore = useCartStore()
    const UserInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
      const res = await loginApi({ account, password })
      console.log('res.result')
      UserInfo.value = res.result
      await mergeCartApi(
        CartStore.CartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
      )
      const resu = await findNewCartListApi()
      CartStore.CartList.value = resu.result
    }
    const clearData = () => {
      UserInfo.value = {}
      CartStore.clearCart()
    }
    return {
      UserInfo,
      getUserInfo,
      clearData
    }
  },
  {
    persist: true
  }
)
