<script setup>
import { getBannerApi } from '@/apis/layout'
import { ref } from 'vue'
import Banner from './subComppnents/Banner.vue'

const BannerList = ref([])
const getBannerList = async () => {
  const res = await getBannerApi()
  BannerList.value = res.result
}
getBannerList()
</script>

<!-- HomeBanner.vue -->
<template>
  <Banner :BannerList="BannerList"></Banner>
</template>

<style scoped lang="scss"></style>
