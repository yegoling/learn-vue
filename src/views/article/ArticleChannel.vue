<script setup>
import { ref } from 'vue'
const channelList = ref([])
import { artGetChannelsService } from '@/api/article.js'
import ChannelEdit from '@/components/ChannelEdit.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
const dialog = ref()
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data
  loading.value = false
}
getChannelList()

const onEditChannel = (row, $index) => {
  console.log(row, $index)
}
const onDeleteChannel = (row, $index) => {
  console.log(row, $index)
}
const onAddChannel = () => {
  dialog.value.open()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel"> 添加分类按钮</el-button>
    </template>
    <!-- label:列名 -->
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            @click="onDeleteChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <template>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <ChannelEdit ref="dialog"></ChannelEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>
