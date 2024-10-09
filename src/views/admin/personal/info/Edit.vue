<template>
  <a-modal
    title="修改"
    :open="open"
    :maskClosable="false"
    @ok="submit"
    @cancel="
      () => {
        open = false
        formRef.resetFields()
      }
    "
  >
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-row>
        <a-col :xs="24" :sm="24">
          <a-form-item label="新密码" name="mima">
            <a-input-password
              v-model:value="formState.mima"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="确认密码" name="confirmPassword">
            <a-input-password
              v-model:value="formState.confirmPassword"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="IP" name="ipS">
            <a-textarea
              v-model:value="formState.ipS"
              placeholder="多个请用英文逗号(,)隔开"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { editUserInfo } from '@/api/admin/personal'
import type { Rule } from 'ant-design-vue/es/form'
import { password } from '@/utils/regexp'

defineOptions({ name: 'Edit' })
// 定义方法
const $emit = defineEmits(['reload'])
const Props = defineProps(['userInfo'])
const open = defineModel('open')
// 表单布局
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 13 },
  },
}

const formRef = ref()
const formState = reactive<any>({})

watch(open, (val) => {
  console.log('open', val)
  if (val) {
    formState.ipS = Props.userInfo.ipS || ''
    // formState.mima = Props.userInfo.mima
  }
})

const rules = {
  // ipS: [{ required: true, message: '请输入' }],
  mima: [
    {
      pattern: password,
      message: '密码不少于6位,且只能包含字母、数字、下划线',
    },
  ],
  confirmPassword: [
    // { required: true, message: '请输入' },
    {
      // required: true,
      validator: async (_rule: Rule, value: string) => {
        if (value !== formState.mima) {
          return Promise.reject('两次输入不一致')
        } else {
          return Promise.resolve()
        }
      },
      trigger: 'change',
    },
  ],
}

const submit = async () => {
  try {
    await formRef.value.validate()
    formState.ipS = formState.ipS.replace('，', ',').replace(' ', '')
    const res = await editUserInfo(formState)
    if (res.code === 0) {
      $emit('reload')
      open.value = false
      message.success(res.msg)
      formRef.value.resetFields()
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}
</script>
