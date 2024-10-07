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
          <a-form-item label="名称" name="mingcheng">
            <a-input v-model:value="formState.mingcheng" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="邮箱" name="youxiang">
            <a-input v-model:value="formState.youxiang" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="备注" name="beizhu">
            <a-textarea v-model:value="formState.beizhu" placeholder="请输入" />
          </a-form-item>
        </a-col>
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
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { editUserInfo } from '@/api/agent/personal'
import type { Rule } from 'ant-design-vue/es/form'

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
    formState.mingcheng = Props.userInfo.mingcheng
    formState.youxiang = Props.userInfo.youxiang
    formState.beizhu = Props.userInfo.beizhu
    // formState.mima = Props.userInfo.mima
  }
})

const rules = {
  mingcheng: [{ required: true, message: '请输入' }],
  youxiang: [{ required: true, message: '请输入' }],
  // beizhu: [{ required: true, message: '请输入' }],
  // mima: [{ required: true, message: '请输入' }],
  confirmPassword: [
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
