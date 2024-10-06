<script setup>
import { ref } from 'vue'
const channelList = ref([])
import { artDelChannelsService, artGetChannelsService } from '@/api/article.js'
import ChannelEdit from '@/components/ChannelEdit.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const dialog = ref()
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data
  loading.value = false
}
getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row)
  console.log(row)
}

const onAddChannel = () => {
  dialog.value.open({})
}

const onDelchannel = async (row) => {
  // 此处有bug，弹出框卡最左边
  await ElMessageBox.confirm('你确认要删除该类吗', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    position: 'top'
  }).then(async () => {
    await artDelChannelsService(row.id)
    ElMessage({
      type: 'success',
      message: 'Delete completed'
    }).catch(() => {})
    getChannelList()
  })
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
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            @click="onDelchannel(row)"
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
