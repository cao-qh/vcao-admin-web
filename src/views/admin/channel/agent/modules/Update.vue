<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="账户" name="账户">
        <a-input v-model:value="formState.账户" disabled />
      </a-form-item>
      <a-form-item label="姓名" name="姓名">
        <a-input v-model:value="formState.姓名" />
      </a-form-item>
      <a-form-item label="注册时间" name="注册时间">
        <a-input v-model:value="formState.注册时间" disabled />
      </a-form-item>
      <a-form-item label="邮箱" name="邮箱">
        <a-input v-model:value="formState.邮箱" />
      </a-form-item>
      <a-form-item label="账号状态" name="账号状态">
        <a-select v-model:value="formState.账号状态">
          <a-select-option value="1">启用</a-select-option>
          <a-select-option value="2">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="备注" name="备注">
        <a-textarea v-model:value="formState.备注"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqUpdateSubmit } from '@/api/table/search/index'

defineOptions({ name: 'Update' })

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
  formState.dingdanhao = row.dingdanhao
  formState.tongdao = row.tongdao
  formState.mianzhi = row.mianzhi
  formState.address = row.address
  formState.beizhu = row.beizhu
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res = await reqUpdateSubmit(formState)
    if (res.code == 200) {
      $emit('success')
      open.value = false
      message.success(res.message)
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

defineExpose({
  show,
})
</script>
