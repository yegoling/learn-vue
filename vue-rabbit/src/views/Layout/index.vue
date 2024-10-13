<script setup>
import LayoutHeader from './components/LayoutHeader.vue'
// import LayoutFixed from './components/LayoutFixed.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/CategoryStore'

const categoryStore = useCategoryStore()
categoryStore.getCategory()
// console.log(categoryStore.categoryList.value)
</script>
<template>
  <LayoutNav></LayoutNav>
  <LayoutFixed></LayoutFixed>
  <layout-header></layout-header>
  <!-- RoutView内不能写东西，不然不再显示二级路由内容 -->
  <RouterView></RouterView>
  <layout-footer></layout-footer>
</template>
<style scoped lang="scss"></style>
