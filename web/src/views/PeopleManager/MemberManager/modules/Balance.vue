<template>
  <a-modal title="修改余额" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="编码" name="huiyuanBianma">
        <a-input
          v-model:value.trim="formState.huiyuanBianma"
          placeholder="请输入"
          disabled
        />
      </a-form-item>
      <a-form-item label="余额" name="yue">
        <a-input-number
          :min="0"
          :precision="2"
          v-model:value.trim="formState.yue"
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
import { reqEditBalance } from '@/api/PeopleManager/MemberManager'

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
  huiyuanBianma: [{ required: true, message: '请输入' }],
  yue: [{ required: true, message: '请输入' }],
}

const show = async (row: any) => {
  open.value = true
  formState.huiyuanBianma = row.bianma
  formState.yue = 0
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res = await reqEditBalance(formState)
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
