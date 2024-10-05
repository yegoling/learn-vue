<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isRegister = ref(true)
// 注册
const form = ref()

const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

const rules = {
  // blur:失去焦点后校验
  // change:改变值后校验
  username: [
    // required=true:非空校验
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    // 长度校验
    {
      min: 5,
      max: 10,
      message: '用户名必须是5-10位字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    // 正则校验
    {
      pattern: /^\S{6,15}/,
      message: '密码必须6-15位非空',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: 'blur'
    },
    // 正则校验
    {
      pattern: /^\S{6,15}/,
      message: '密码必须6-15位非空',
      trigger: 'blur'
    },
    // 自定义校验:
    // rule:当前校验规则相关信息
    // value:校验元素当前内容
    // callback:校验成功callback()，校验失败callback(new error(错误信息))
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次密码不一致'))
        } else callback()
      },
      trigger: 'blur'
    }
  ]
}

const register = async () => {
  await form.value.validate()
  //   console.log('开始注册请求')
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  isRegister.value == false
}

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  //   console.log(res)
  userStore.setToken(res.token)
  console.log(userStore.token)
  ElMessage.success('登录成功')
  router.push('/')
}

watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <!-- 校验相关：
    1.el-form:
    model="ruleForm" 绑定整个form的数据对象
    rules="rules" 绑定整个rules规则对象
    2.表单元素：
    v-model="ruleForm.xxx" 给表单元素绑定form的子属性
    prop配置生效的是哪个校验规则（和rules对应） -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register()"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login()"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
