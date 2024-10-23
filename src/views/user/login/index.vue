<template>
  <div class="login">
    <a-typography-text class="h1">{{ setting.title }}</a-typography-text>
    <a-typography-text class="h2">登录</a-typography-text>
    <a-form ref="formRef" :model="loginForm" :rules="rules" class="login-form">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="账户密码登录">
          <a-form-item name="username">
            <a-input
              size="large"
              v-model:value="loginForm.username"
              placeholder="用户名"
            >
              <template #prefix>
                <UserOutlined style="color: gray" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password">
            <a-input-password
              size="large"
              v-model:value="loginForm.password"
              type="password"
              placeholder="密码"
            >
              <template #prefix>
                <LockOutlined style="color: gray" />
              </template>
            </a-input-password>
          </a-form-item>
        </a-tab-pane>

        <a-tab-pane key="2" tab="手机号登录">
          <a-form-item name="phone">
            <a-input
              size="large"
              v-model:value="loginForm.phone"
              placeholder="手机号"
            >
              <template #prefix>
                <TabletOutlined style="color: gray" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="yanZhengMa">
            <a-flex gap="small">
              <a-input
                size="large"
                v-model:value="loginForm.yanZhengMa"
                placeholder="验证码"
              >
                <template #prefix>
                  <MailOutlined style="color: gray" />
                </template>
              </a-input>
              <a-statistic-countdown
                v-if="isWaitCode"
                :value="deadline"
                format="ss"
                :valueStyle="{
                  height: '100%',
                  width: '112px',
                  textAlign: 'center',
                  color: 'gray',
                  fontSize: '20px',
                  lineHeight: '40px',
                  backgroundColor: '#ffffff',
                }"
                @finish="onFinish"
              >
                <template #suffix>
                  <span>s</span>
                </template>
              </a-statistic-countdown>
              <a-button v-else size="large" @click="getCode">
                获取验证码
              </a-button>
            </a-flex>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <a-flex style="margin-bottom: 10px" justify="space-between">
        <!-- <RouterLink to="/user/register">注册账号</RouterLink> -->
        <!-- 占位的 -->
        <div style="height: 22px"></div>
        <a-checkbox
          v-if="activeKey === '1'"
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
import { phone } from '@/utils/regexp'
// import { reqPhoneCode } from '@/api/user'
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting'

const layoutSettingStore = useLayoutSettingStore()

const useStore = useUserStore()
// 获取路由器
const $router = useRouter()
// 获取路由对象
const $route = useRoute()

// 收集账户与密码的数据
const loginForm = reactive<any>({})
// 表单引用
const formRef = ref()
// 记住密码
const isRemembermima = ref(false)

// 登录方式
const activeKey = ref('1')

// 获取验证码的倒计时
const deadline = ref(0)
const isWaitCode = ref(false)

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
  phone: [
    {
      required: true,
      pattern: phone,
      message: '手机号必填或格式不正确',
      trigger: 'change',
    },
  ],
  yanZhengMa: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'change',
    },
  ],
}

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

// 记住密码状态改变
const onRemembermimaChange = (e: any) => {
  const remembermima = JSON.stringify({
    status: e.target?.checked,
  })
  localStorage.setItem('REMEMBER_PASSWORD', remembermima)
}

const login = async () => {
  try {
    // 通知仓库发登录请求
    // 请求成功->首页展示数据的地方
    // 请求失败->登录失败的提示
    try {
      if (activeKey.value === '1') {
        await formRef.value.validate(['username', 'password'])
        // 账号密码登录
        const data = {
          username: loginForm.username,
          password: loginForm.password,
        }
        // 保证登录成功
        await useStore.userLogin(data)

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
      }
      if (activeKey.value === '2') {
        await formRef.value.validate(['phone', 'yanZhengMa'])
        // 手机验证码登录
        const data = {
          phone: loginForm.phone,
          yanZhengMa: loginForm.yanZhengMa,
        }
        // 保证登录成功
        await useStore.phoneLogin(data)
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
        message: activeKey.value === '1' ? loginForm.username : loginForm.phone,
        description: error.message,
      })
    }
  } catch (error) {
    console.log('error', error)
  }
}

const onFinish = () => {
  isWaitCode.value = false
}

// 获取验证码
const getCode = async () => {
  // try {
  //   await formRef.value.validate(['phone'])
  //   deadline.value = new Date().getTime() + 60 * 1000
  //   isWaitCode.value = true
  //   const data = {
  //     phone: loginForm.phone,
  //   }
  //   const res = await reqPhoneCode(data)
  //   if (res.code == 0) {
  //     message.success(res.msg)
  //   } else {
  //     message.error(res.msg)
  //     isWaitCode.value = false
  //   }
  // } catch (e: any) {
  //   console.log('e :>> ', e)
  // }
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

  .login-form {
    .login-btn {
      width: 100%;
    }
  }
}
</style>
