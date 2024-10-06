<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'

const visiableDrawer = ref(false)

const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}

//formModel.value指ref()里包的东西吗
const formModel = ref({
  //基于defaultForm展开，相当于拷贝
  ...defaultForm
})

//根据传入的row判断是什么逻辑，有id是编辑，没id是添加
const open = (row) => {
  visiableDrawer.value = true

  if (row.id) {
  } else {
    //添加前重置数据
    formModel.value = { ...defaultForm }
  }
}

defineExpose({
  open
})
</script>

import ChannelSelect from './ChannelSelect.vue'

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"> 文件上传 </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
