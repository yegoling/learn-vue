import axios from "axios";

const httpInstance=axios.create({
    baseURL:"",
    timeout:5000
})

//请求拦截器
httpInstance.interceptors.request.use(config=>{
    return config
},e=>Promise.reject(e))

//响应拦截器
httpInstance.interceptors.response.use(res=>res.data,e=>Promise.reject(e))
export default httpInstance