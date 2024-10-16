<template>
  <div class="login">
    <a-typography-text class="h1">{{ setting.title }}</a-typography-text>
    <a-typography-text class="h2">代理员登录</a-typography-text>

    <a-form ref="formRef" :model="loginForm" :rules="rules" class="login-form">
      <a-form-item name="shoujihao">
        <a-input
          size="large"
          v-model:value.trim="loginForm.shoujihao"
          placeholder="手机号"
        >
          <template #prefix>
            <UserOutlined style="color: gray" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="mima">
        <a-input-password
          size="large"
          v-model:value.trim="loginForm.mima"
          type="mima"
          placeholder="密码"
        >
          <template #prefix>
            <LockOutlined style="color: gray" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-flex style="margin-bottom: 10px" justify="space-between">
        <a-checkbox
          v-model:checked="isRemembermima"
          @change="onRemembermimaChange"
        >
          记住密码
        </a-checkbox>
      </a-flex>

      <a-form-item>
        <a-button class="login-btn" type="primary" size="large" @click="login">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
import { notification } from 'ant-design-vue'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting'
import { phone } from '@/utils/regexp'

const useStore = useUserStore()
// 获取路由器
const $router = useRouter()
// 获取路由对象
const $route = useRoute()
// 收集账户与密码的数据
const loginForm = reactive({ shoujihao: '', mima: '', role: 2 })

const layoutSettingStore = useLayoutSettingStore()

// 表单验证
const rules = {
  shoujihao: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'change',
    },
    {
      pattern: phone,
      message: '手机号格式不正确',
      trigger: 'change',
    },
  ],
  mima: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'change',
    },
    {
      min: 6,
      max: 15,
      message: '密码长度为6-15位',
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
  const remembermima = JSON.parse(localStorage.getItem('REMEMBER_mima') || '{}')
  if (remembermima.status) {
    isRemembermima.value = remembermima.status
    loginForm.shoujihao = remembermima.shoujihao
    loginForm.mima = remembermima.mima
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
          'REMEMBER_mima',
          JSON.stringify({
            status: true,
            shoujihao: loginForm.shoujihao,
            mima: loginForm.mima,
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
        message: loginForm.shoujihao,
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
  localStorage.setItem('REMEMBER_mima', remembermima)
}
</script>

<style scoped lang="scss">
.login {
  width: 375px;
  margin: 0 auto;

  .h1 {
    font-size: 25px;
    padding: 10px 0;
    text-align: center;
    display: block;
    color: v-bind('layoutSettingStore.themeColor');
  }
  .h2 {
    font-size: 15px;
    padding: 0 0 10px 0;
    text-align: center;
    display: block;
  }

  .role {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }

  .login-form {
    .login-btn {
      width: 100%;
    }
  }
}
</style>
