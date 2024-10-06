<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data
}

defineProps({
  // 必须命名为modelValue，和父组件中v-model对应
  modelValue: {
    type: [Number, String]
  }
})

getChannelList()
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <!-- label用来展示，value用来提交后台 -->
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
