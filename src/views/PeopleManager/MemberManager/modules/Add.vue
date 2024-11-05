<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="头像" name="img">
        <UploadImage
          v-model:value.trim="formState.img"
          placeholder="请输入"
        ></UploadImage>
      </a-form-item>
      <a-form-item label="账户" name="zhanghu">
        <a-input v-model:value.trim="formState.zhanghu" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="密码" name="mima">
        <a-input-password
          v-model:value.trim="formState.mima"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="名称" name="mingcheng">
        <a-input
          v-model:value.trim="formState.mingcheng"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="会员等级" name="huiyuandengji">
        <a-input-number
          :min="0"
          v-model:value="formState.huiyuandengji"
          placeholder="请选择"
          style="width: 100%"
        />
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
      <a-form-item label="登录IP" name="dengluip">
        <a-textarea
          v-model:value.trim="formState.dengluip"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/PeopleManager/MemberManager'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Add' })

// 属性
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
  img: [{ required: true, message: '请选择' }],
  zhanghu: [{ required: true, message: '请输入' }],
  mima: [
    {
      required: true,
      min: 6,
      message: '请输入6位以上密码',
    },
  ],
  mingcheng: [{ required: true, message: '请选择' }],
  huiyuandengji: [{ required: true, message: '请输入' }],
  qijinyong: [{ required: true, message: '请选择' }],
  dengluip: [{ required: true, message: '请输入' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    img: null,
    zhanghu: '',
    mima: '',
    mingcheng: '',
    huiyuandengji: 0,
    qijinyong: 1,
    dengluip: '',
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)

    const formData = new FormData()
    formData.append('img', formState.img)
    formData.append('zhanghu', formState.zhanghu)
    formData.append('mima', formState.mima)
    formData.append('mingcheng', formState.mingcheng)
    formData.append('huiyuandengji', formState.huiyuandengji)
    formData.append('qijinyong', formState.qijinyong)
    formData.append('dengluip', formState.dengluip)

    const res = await reqAdd(formData)
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
