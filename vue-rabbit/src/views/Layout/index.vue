<script setup>
import LayoutHeader from './components/LayoutHeader.vue'
// import LayoutFixed from './components/LayoutFixed.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/categoryStore'

const categoryStore = useCategoryStore()
categoryStore.getCategory()
// console.log(categoryStore.categoryList.value)
</script>
<template>
  <LayoutNav></LayoutNav>
  <LayoutFixed></LayoutFixed>
  <layout-header></layout-header>
  <div style="height: 500px"></div>
  <RouterView>home界面</RouterView>
  <layout-footer></layout-footer>
</template>
<style scoped lang="scss"></style>
