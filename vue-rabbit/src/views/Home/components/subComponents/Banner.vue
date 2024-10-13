<script setup>
defineProps({
  BannerList: Object
})
</script>

<template>
  <el-carousel height="500px">
    <el-carousel-item v-for="item in BannerList" :key="item.id">
      <img :src="item.imgUrl" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped lang="scss"></style>
