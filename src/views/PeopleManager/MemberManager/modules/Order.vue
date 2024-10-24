<template>
  <a-modal title="订购" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="编码" name="bm">
        <a-input
          v-model:value.trim="formState.bm"
          placeholder="请输入"
          disabled
        />
      </a-form-item>
      <a-form-item label="时长" name="sc">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.sc"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/table/search/index'

defineOptions({ name: 'Order' })

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
  bm: [{ required: true, message: '请输入' }],
  sc: [{ required: true, message: '请输入' }],
}

const show = async (row: any) => {
  open.value = true
  formState.bm = row.bm
  formState.sc = row.sc
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
