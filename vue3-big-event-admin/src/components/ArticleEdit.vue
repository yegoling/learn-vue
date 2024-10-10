<script setup>
import { ref, nextTick } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artEditService,
  artGetDetailService,
  artPublishService
} from '@/api/article'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'
import axios from 'axios'
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}

const editref = ref()

//formModel.value指ref()里包的东西吗
const formModel = ref({
  //基于defaultForm展开，相当于拷贝
  ...defaultForm
})

const visiableDrawer = ref(false)

const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw) //预览图片
  //立刻将图片对象，存入 formModel.value.cover_img将来用于提交
  formModel.value.cover_img = uploadFile.raw
}

const emit = defineEmits(['success'])
// 提交
const onPublish = async (state) => {
  // 将已发布还是草稿状态存入formModel
  formModel.value.state = state
  // 当前接口需要formDate对象，将普通对象转换成formDate对象
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  // 发请求，根据id判断是添加还是编辑
  if (formModel.value.id) {
    // 编辑
    await artEditService(fd)
    ElMessage('修改成功')
    visiableDrawer.value = false
    emit('success', 'edit')
  } else {
    // 提交
    await artPublishService(fd)
    ElMessage.success('添加成功')
    visiableDrawer.value = false
    // 通知父组件添加成功
    emit('success', 'add')
  }
}

//根据传入的row判断是什么逻辑，有id是编辑，没id是添加
const open = async (row) => {
  visiableDrawer.value = true

  if (row.id) {
    //  id存在则进行编辑，根据id获取文章详情，存入formModel.value
    const res = await artGetDetailService(row.id)
    console.log(res.data)
    formModel.value = res.data
    // 图片回显单独处理
    imgUrl.value = baseURL + formModel.value.cover_img
    // 需要将网络图片地址转换成file对象提交给后台
    await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
  } else {
    //添加前重置数据
    formModel.value = { ...defaultForm }
    imgUrl.value = ''
    // DOM更新后再调用其方法
    nextTick(() => {
      editref.value.setHTML('')
    })
  }
}

defineExpose({
  open
})

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
</script>

<template>
  <el-drawer
    v-model="visiableDrawer"
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
        <ChannelSelect v-model="formModel.cate_id"> </ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 配置上传图片，需要关闭element-plus的自动上传，不需要配置action等参数，只需做前端的本地预览图片 -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editref"
            v-model:content="formModel.content"
            theme="snow"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
