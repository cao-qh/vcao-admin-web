<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout">
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
      <a-form-item label="姓名" name="mingcheng">
        <a-input
          v-model:value.trim="formState.mingcheng"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="邮箱" name="yx">
        <a-input v-model:value.trim="formState.yx" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="登录IP" name="ips">
        <a-textarea
          v-model:value.trim="formState.ips"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/table/search/index'

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

const show = async (row: any) => {
  open.value = true
  formState.shoujihao = row.shoujihao
  formState.mima = row.mima
  formState.mingcheng = row.mingcheng
  formState.yx = row.yx
  formState.ips = row.ips
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
