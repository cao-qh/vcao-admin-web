<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="账户" name="账户">
        <a-input v-model:value="formState.账户" disabled />
      </a-form-item>
      <a-form-item label="密码" name="密码">
        <a-input-password v-model:value="formState.密码" />
      </a-form-item>
      <a-form-item label="姓名" name="姓名">
        <a-input v-model:value="formState.姓名" />
      </a-form-item>
      <a-form-item label="手机" name="手机">
        <a-input v-model:value="formState.手机" />
      </a-form-item>
      <a-form-item label="登录方式" name="登录方式">
        <a-select v-model:value="formState.登录方式">
          <a-select-option key="" value="1">ip</a-select-option>
          <a-select-option key="" value="2">手机号</a-select-option>
          <a-select-option key="" value="3">无</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="IP" name="ip">
        <a-textarea v-model:value="formState.ip"></a-textarea>
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
