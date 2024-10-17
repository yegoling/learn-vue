import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './UserStore'
import { delCartApi, findNewCartListApi, insertCartApi } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const UserStore = useUserStore()
    const CartList = ref([])
    const isLogin = computed(() => UserStore.UserInfo.token)
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        await insertCartApi({ skuId, count })
        const res = await findNewCartListApi()
        CartList.value = res.result
      } else {
        const item = CartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          item.count++
        } else {
          CartList.value.push(goods)
        }
      }
    }

    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartApi([skuId])
        const res = await findNewCartListApi()
        CartList.value = res.result
      } else {
        // 找到要删除的值的下标
        const idx = CartList.value.findIndex((item) => skuId === item.skuId)
        //表示从下标idx开始删除一个元素
        CartList.value.splice(idx, 1)
      }
    }
    const allCount = computed(() =>
      CartList.value.reduce((pre, cur) => pre + cur.count, 0)
    )
    const allPrice = computed(() =>
      CartList.value.reduce((pre, cur) => pre + cur.count * cur.price, 0)
    )
    const singleCheck = (skuId, selected) => {
      const item = CartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }
    const allCheck = (selected) => {
      CartList.value.forEach((item) => (item.selected = selected))
    }
    // 判断所有item都已被选中则全选框自动打钩
    const isAll = computed(() => CartList.value.every((item) => item.selected))

    const selectedCount = computed(() =>
      CartList.value
        .filter((item) => item.selected)
        .reduce((pre, cur) => pre + cur.count, 0)
    )
    const selectedPrice = computed(() =>
      CartList.value
        .filter((item) => item.selected)
        .reduce((pre, cur) => pre + cur.count * cur.price, 0)
    )
    const clearCart = () => {
      CartList.value = []
    }
    return {
      CartList,
      addCart,
      delCart,
      allCount,
      selectedCount,
      allPrice,
      selectedPrice,
      singleCheck,
      allCheck,
      isAll,
      clearCart
    }
  },
  {
    persist: true
  }
)
