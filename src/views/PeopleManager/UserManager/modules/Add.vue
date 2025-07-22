<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="账户/手机号" name="shoujihao">
        <a-input
          v-model:value.trim="formState.shoujihao"
          placeholder="请输入"
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
      <a-form-item label="启禁用" name="qijinyong">
        <a-radio-group v-model:value="formState.qijinyong">
          <a-radio-button
            v-for="item in qijinyong"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/PeopleManager/UserManager'
import { phone, email } from '@/utils/regexp'

defineOptions({ name: 'Add' })

defineProps({
  qijinyong: {
    type: Array<any>,
    default: () => [],
  },
})

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
  youxiang: [{ pattern: email, message: '请输入正确的邮箱' }],
  qijinyong: [{ required: true, message: '请选择' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    shoujihao: '',
    xingming: '',
    mima: '',
    youxiang: '',
    ip: '',
    qijinyong: 1,
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
