import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/index'
import router from '@/router/index'
const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // 基础地址，超时时间
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    // 获取token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (result) => {
    // 摘取核心响应数据
    if (result.data.code === 0) {
      return result.data
    }
    // 处理业务失败
    ElMessage.error(result.data.message ? result.data.message : '服务异常')
    return Promise.reject(result.data)
  },
  (error) => {
    //   处理401错误

    // 特殊情况：401权限不足或token过期=>拦截到登录
    if (error.response.status === 401) {
      ElMessage.error('请先登录')
      // Have problems here
      router.push('/login')
    }
    // 默认情况
    else {
      ElMessage.error('服务异常')
    }
    return Promise.reject(error)
  }
)

export default instance
