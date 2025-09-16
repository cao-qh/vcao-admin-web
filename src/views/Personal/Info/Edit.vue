<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="账户/手机号" name="tel">
        <a-input
          v-model:value.trim="formState.tel"
          placeholder="请输入"
          disabled
        />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password
          v-model:value.trim="formState.password"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="姓名" name="username">
        <a-input v-model:value.trim="formState.username" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value.trim="formState.email" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="登录IP" name="ip">
        <a-textarea
          v-model:value.trim="formState.ip"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/PeopleManager/UserManager'
import { phone, ips } from '@/utils/regexp'

defineOptions({ name: 'Edit' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

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
  tel: [{ required: true, pattern: phone, message: '请输入正确的手机号' }],
  ip: [{ pattern: ips, message: '请输入正确的IP地址' }],
}

const show = async (row: any) => {
  open.value = true
  formState.tel = row.tel
  formState.password = row.password
  formState.username = row.username
  formState.email = row.email
  formState.ip = row.ip
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res = await reqEdit(formState)
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

defineExpose({
  show,
})
</script>
