import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia().use(persist)

// 默认导出pinia
export default pinia

// 接收user模块中的所有按需导出
export * from './modules/user'
