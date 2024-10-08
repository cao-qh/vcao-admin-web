<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="账户/手机号" name="shoujihao">
        <a-input v-model:value="formState.shoujihao" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="密码" name="mima">
        <a-input-password v-model:value="formState.mima" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="名称" name="mingcheng">
        <a-input v-model:value="formState.mingcheng" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="邮箱" name="youxiang">
        <a-input v-model:value="formState.youxiang" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="启禁用" name="qijinyong" placeholder="请选择">
        <a-radio-group v-model:value="formState.qijinyong">
          <a-radio-button :value="1">启用</a-radio-button>
          <a-radio-button :value="2">禁用</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="备注" name="beizhu" placeholder="请输入">
        <a-textarea
          v-model:value="formState.beizhu"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/admin/channel/agent'
import { phone, email } from '@/utils/regexp'

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
  mingcheng: [{ required: true, message: '请输入' }],
  mima: [
    {
      required: true,
      min: 6,
      message: '请输入6位以上密码',
    },
  ],
  shoujihao: [
    { required: true, message: '请输入' },
    {
      pattern: phone,
      message: '请输入正确的手机号',
    },
  ],
  qijinyong: [{ required: true, message: '请选择' }],
  youxiang: [
    {
      pattern: email,
      message: '请输入正确的邮箱',
    },
  ],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    mingcheng: '',
    mima: '',
    shoujihao: '',
    qijinyong: 1,
    youxiang: '',
    beizhu: '',
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)
    const res = await reqAdd(formState)
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
