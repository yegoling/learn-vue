<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import { useRouter } from 'vue-router'
// // import { useUserStore } from '@/stores/index'
// const router = useRouter()
// // const route = useRoute()
</script>

<template>
  <div>
    <el-config-provider :locale="zhCn"><router-view /></el-config-provider>
  </div>
</template>

<style scoped></style>
