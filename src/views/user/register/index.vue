<template>
  <div class="register">
    <a-typography-text class="h1">{{ setting.title }}</a-typography-text>
    <a-typography-text class="h2">注册</a-typography-text>
    <a-form ref="formRef" :model="formStatus" :rules="rules">
      <a-form-item name="username">
        <a-input
          size="large"
          placeholder="注册账户"
          v-model:value="formStatus.username"
        />
      </a-form-item>
      <a-form-item name="password">
        <a-input
          size="large"
          placeholder="密码"
          v-model:value="formStatus.password"
        />
      </a-form-item>
      <a-form-item name="password2">
        <a-input
          size="large"
          placeholder="确认密码"
          v-model:value="formStatus.password2"
        />
      </a-form-item>
      <a-form-item name="phone">
        <a-input
          size="large"
          placeholder="手机号"
          v-model:value="formStatus.phone"
        />
      </a-form-item>
      <a-form-item name="mingcheng">
        <a-input
          size="large"
          placeholder="名称"
          v-model:value="formStatus.mingcheng"
        />
      </a-form-item>
      <a-form-item name="code">
        <a-flex gap="small">
          <a-input
            size="large"
            placeholder="验证码"
            v-model:value="formStatus.code"
          />
          <a-button v-if="!isWaitCode" size="large" @click="getCode">
            获取验证码
          </a-button>
          <div v-else style="background-color: #ffffff">
            <a-statistic-countdown
              :value="deadline"
              format="ss"
              :valueStyle="{
                height: '100%',
                width: '80px',
                textAlign: 'center',
                color: 'gray',
                fontSize: '20px',
                lineHeight: '40px',
              }"
              @finish="onFinish"
            />
          </div>
        </a-flex>
      </a-form-item>

      <div style="text-align: right">
        <RouterLink to="/user/login">返回登录</RouterLink>
      </div>

      <a-form-item>
        <a-button
          class="login-btn"
          type="primary"
          size="large"
          @click="register"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, h, onMounted } from 'vue'
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting'
import { reqCode, reqRegister } from '@/api/user'
import { phone } from '@/utils/regexp'
import { message, Modal } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'

defineOptions({
  name: 'Register',
})

const validatePass = async (_rule: any, value: string) => {
  if (value === '') {
    return Promise.reject('请输入密码')
  } else {
    if (formStatus.password !== '') {
      formRef.value.validateFields('password2')
    }
    return Promise.resolve()
  }
}
const validatePass2 = async (_rule: any, value: string) => {
  if (value === '') {
    return Promise.reject('请再次输入密码')
  } else if (value !== formStatus.password) {
    return Promise.reject('两次输入密码不匹配')
  } else {
    return Promise.resolve()
  }
}

// 表单验证
const rules = {
  sjzhanghu: [
    {
      required: true,
      message: '上级账户不能为空',
    },
  ],
  username: [
    {
      required: true,
      message: '注册账户不能为空',
    },
  ],
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: 'change',
    },
  ],
  password2: [
    {
      validator: validatePass2,
      trigger: 'change',
    },
  ],
  phone: [
    {
      required: true,
      message: '手机号不能为空',
    },
    {
      pattern: phone,
      message: '手机号格式不正确',
    },
  ],
  mingcheng: [
    {
      required: true,
      message: '名称不能为空',
    },
  ],
  code: [
    {
      required: true,
      message: '验证码不能为空',
    },
  ],
}

const layoutSettingStore = useLayoutSettingStore()

const formStatus = reactive<any>({})

const deadline = ref(0)

const isWaitCode = ref(false)

const formRef = ref()

const $route = useRoute()

const $router = useRouter()

onMounted(() => {
  formStatus.sjzhanghu = $route.query.username
})

// 获取验证码
const getCode = async () => {
  try {
    await formRef.value.validate(['phone', 'username', 'mingcheng'])
    deadline.value = new Date().getTime() + 60 * 1000
    isWaitCode.value = true
    const data = {
      phone: formStatus.phone,
      username: formStatus.username,
      mingcheng: formStatus.mingcheng,
    }
    const res = await reqCode(data)
    if (res.code == 0) {
      message.success(res.msg)
    } else {
      message.error(res.msg)
      isWaitCode.value = false
    }
  } catch (e: any) {
    console.log('e :>> ', e)
  }
}

const onFinish = () => {
  isWaitCode.value = false
}

// 点击注册按钮
const register = async () => {
  try {
    await formRef.value.validate()

    const res = await reqRegister(formStatus)
    if (res.code === 0) {
      Modal.success({
        title: '注册成功',
        content: h('div', {}, [
          h('p', `上级账户：${formStatus.sjzhanghu}`),
          h('p', `注册账户：${formStatus.username}`),
        ]),
        okText: '去登录',
        onOk: () => {
          $router.push({
            path: '/user/login',
          })
        },
      })
    } else {
      message.error(res.msg)
    }
  } catch (e: any) {
    console.log('e :>> ', e)
  }
}
</script>

<style lang="scss" scoped>
.register {
  margin-top: 20%;
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

  .to-login {
    background-color: aqua;
    width: 100px;
    text-align: right;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
