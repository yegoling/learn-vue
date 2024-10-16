import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

//请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const UserStore = useUserStore()
    const token = UserStore.UserInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

//响应拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    })
    //  处理401
    const UserStore = useUserStore()
    if (e.response.status === 401) {
      UserStore.clearData()
      router.push('/login')
    }
    return Promise.reject(e)
  }
)
export default httpInstance
