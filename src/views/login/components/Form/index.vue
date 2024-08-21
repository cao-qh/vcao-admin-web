<template>
  <a-form ref="formRef" :model="loginForm" :rules="rules" class="login-form">
    <a-form-item name="username">
      <a-input v-model:value="loginForm.username">
        <template #prefix>
          <UserOutlined style="color: gray" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item name="password">
      <a-input-password v-model:value="loginForm.password" type="password">
        <template #prefix>
          <LockOutlined style="color: gray" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-checkbox
      style="margin-bottom: 10px"
      v-model:checked="isRemembermima"
      @change="onRemembermimaChange"
    >
      记住密码
    </a-checkbox>

    <a-form-item>
      <a-button class="login-btn" type="primary" @click="login">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
import { notification } from 'ant-design-vue'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'

const useStore = useUserStore()
// 获取路由器
const $router = useRouter()
// 获取路由对象
const $route = useRoute()
// 收集账户与密码的数据
const loginForm = reactive({ username: '', password: '' })

// 表单验证
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'change',
    },
    {
      min: 5,
      max: 15,
      message: '用户名长度为5-15位',
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'change',
    },
    {
      min: 5,
      max: 15,
      message: '密码长度为5-15位',
      trigger: 'change',
    },
  ],
}
// 表单引用
const formRef = ref()
// 记住密码
const isRemembermima = ref(false)

onMounted(() => {
  // 是否记住密码
  const remembermima = JSON.parse(
    localStorage.getItem('REMEMBER_PASSWORD') || '{}',
  )
  if (remembermima.status) {
    isRemembermima.value = remembermima.status
    loginForm.username = remembermima.username
    loginForm.password = remembermima.password
  }
})

const login = async () => {
  try {
    await formRef.value.validate()
    // 通知仓库发登录请求
    // 请求成功->首页展示数据的地方
    // 请求失败->登录失败的提示
    try {
      // 保证登录成功
      await useStore.userLogin(loginForm)

      // 记住密码
      if (isRemembermima.value) {
        localStorage.setItem(
          'REMEMBER_PASSWORD',
          JSON.stringify({
            status: true,
            username: loginForm.username,
            password: loginForm.password,
          }),
        )
      }

      const redirect = $route.query.redirect
      // 编程式导航跳转到展示数据首页
      $router.push({ path: redirect ? String(redirect) : '/' })
      // 登录成功提示信息
      notification.success({
        message: '欢迎回来',
        description: `HI，${getTime()}好`,
      })
    } catch (error: any) {
      // 登录失败提示信息
      notification.error({
        message: loginForm.username,
        description: error.message,
      })
    }
  } catch (error) {
    console.log('error', error)
  }
}

// 记住密码状态改变
const onRemembermimaChange = (e: any) => {
  const remembermima = JSON.stringify({
    status: e.target?.checked,
  })
  localStorage.setItem('REMEMBER_PASSWORD', remembermima)
}
</script>

<style scoped lang="scss">
.login-form {
  .login-btn {
    width: 100%;
  }
}
</style>
