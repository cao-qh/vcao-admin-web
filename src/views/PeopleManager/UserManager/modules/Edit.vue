<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="账户/手机号" name="shoujihao">
        <a-input
          v-model:value.trim="formState.shoujihao"
          placeholder="请输入"
          disabled
        />
      </a-form-item>
      <a-form-item label="密码" name="mima">
        <a-input-password
          v-model:value.trim="formState.mima"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="姓名" name="xingming">
        <a-input v-model:value.trim="formState.xingming" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="邮箱" name="youxiang">
        <a-input v-model:value.trim="formState.youxiang" placeholder="请输入" />
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
import { phone } from '@/utils/regexp'

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
  shoujihao: [
    { required: true, pattern: phone, message: '请输入正确的手机号' },
  ],
  mima: [
    {
      required: true,
      min: 6,
      message: '请输入6位以上密码',
    },
  ],
  xingming: [{ required: true, message: '请输入' }],
}

const show = async (row: any) => {
  open.value = true
  formState.shoujihao = row.shoujihao
  formState.mima = row.mima
  formState.xingming = row.xingming
  formState.youxiang = row.youxiang
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
