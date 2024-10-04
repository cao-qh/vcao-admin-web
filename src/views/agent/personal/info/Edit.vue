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
          <a-form-item label="新密码" name="password">
            <a-input-password
              v-model:value="formState.password"
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
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/admin/goods'
import type { Rule } from 'ant-design-vue/es/form'

defineOptions({ name: 'Edit' })
// 定义方法
const $emit = defineEmits(['success'])
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

const rules = {
  password: [{ required: true, message: '请输入' }],
  confirmPassword: [
    { required: true, message: '请输入' },
    {
      validator: async (_rule: Rule, value: string) => {
        if (value !== formState.password) {
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

    const formData = new FormData()

    const res = await reqEdit(formData)
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success(res.msg)
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}
</script>
