<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="用户协议" name="yhxy">
        <a-textarea
          v-model:value.trim="formState.yhxy"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="隐私政策" name="yszc">
        <a-textarea
          v-model:value.trim="formState.yszc"
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

const rules = {
  yhxy: [{ required: true, message: '请输入' }],
  yszc: [{ required: true, message: '请输入' }],
}

const show = async (row: any) => {
  open.value = true
  formState.yhxy = row.yhxy
  formState.yszc = row.yszc
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
