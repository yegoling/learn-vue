import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi } from '@/apis/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const UserInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
      const res = await loginApi({ account, password })
      console.log('res.result')
      UserInfo.value = res.result
    }
    const clearData = () => {
      UserInfo.value = {}
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
