<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="模板名称" name="模板名称">
        <a-input v-model:value="formState.模板名称" />
      </a-form-item>
      <a-form-item label="中文参数" name="中文参数">
        <a-input v-model:value="formState.中文参数" />
      </a-form-item>
      <a-form-item label="英文参数" name="英文参数">
        <a-input v-model:value="formState.英文参数" />
      </a-form-item>
      <a-form-item label="备注" name="beizhu">
        <a-textarea v-model:value="formState.beizhu"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/table/search/index'

defineOptions({ name: 'Add' })

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
  phone: [{ required: true, message: '请输入电话' }],
  mianzhi: [{ required: true, message: '请选择面值' }],
  tongdao: [{ required: true, message: '请选择通道' }],
  address: [{ required: true, message: '请选择地址' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    phone: '',
    mianzhi: '',
    tongdao: '',
    beizhu: '',
    address: '',
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)
    const res = await reqAdd(formState)
    if (res.code == 200) {
      $emit('success')
      open.value = false
      message.success(res.message)
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
