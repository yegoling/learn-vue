<script setup>
import { getBannerApi } from '@/apis/layout'
import { ref } from 'vue'
import Banner from './subComponents/Banner.vue'

const BannerList = ref([])
const getBannerList = async () => {
  const res = await getBannerApi()
  BannerList.value = res.result
}
getBannerList()
</script>

<!-- HomeBanner.vue -->
<template>
  <div class="home-banner">
    <Banner :BannerList="BannerList"></Banner>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  img {
    width: 100%;
    height: 500px;
  }
}
</style>
