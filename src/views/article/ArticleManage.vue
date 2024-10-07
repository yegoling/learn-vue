<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from '@/components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from '@/components/ArticleEdit.vue'

// 文章列表
const articleList = ref([])
// 默认总条数0
const total = ref(0)

const loading = ref(false)
// 请求参数
const params = ref({
  pagenum: 1, //当前页
  pagesize: 5, //当前生效的每页条数
  cate_id: '',
  state: ''
})

// 基于请求参数,获得列表
const getArticleList = async () => {
  loading.value = true

  const res = await artGetListService(params.value)
  articleList.value = res.data
  total.value = res.data.total

  loading.value = false
}

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.date_id = ''
  params.value.state = ''
}

// 处理分页逻辑
// 改变几条每页时的触发函数
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
// 当前页改变的触发函数
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}
const articleEditRef = ref()
//添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}
//编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
//删除逻辑
// const onDeleteArticle = (row) => {}

//添加或编辑成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    //添加则渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <page-container>
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form :inline="true">
      <el-form-item label="文章分类">
        <!-- vue2中的"v-model"  :value和@input的简写
        vue3中的"v-model"  :modelvalue和@update:modelvalue的简写 -->
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <!-- 利用作用域插槽row获取当前槽的数据 -->
      <el-table-column label="操作" #default="{ row }">
        <el-button
          circle
          plain
          type="primary"
          :icon="Edit"
          @click="onEditArticle(row)"
        ></el-button>
        <el-button
          circle
          plain
          type="danger"
          :icon="Delete"
          @click="onDeleteArticle(row)"
        ></el-button>
      </el-table-column>
    </el-table>

    <!-- 分页区 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      page-sizes="[2,3,5,10]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="jumper,total, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>

  <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
</template>
