<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="支付方式" name="zhifenfangshi">
        <a-select v-model:value="formState.zhifenfangshi" placeholder="请选择">
          <a-select-option
            v-for="item in payType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="支付参数" name="zhifucanshu">
        <a-textarea
          v-model:value.trim="formState.zhifucanshu"
          placeholder="请输入"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/AppConfig/Pay'
import { validateJSON } from '@/utils/validateJSON'

defineOptions({ name: 'Add' })

// 属性
defineProps({
  payType: {
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

const rules = {
  zhifenfangshi: [{ required: true, message: '请选择' }],
  zhifucanshu: [
    {
      required: true,
      validator: async (rule: any, value: any) => {
        if (value === '') {
          return Promise.reject('请输入参数')
        } else if (!validateJSON(value)) {
          return Promise.reject('参数格式错误')
        } else if (validateJSON(value)) {
          const jdata = JSON.parse(value)
          if (typeof jdata === 'object' || Array.isArray(jdata)) {
            return Promise.resolve()
          }
          return Promise.reject('参数格式错误')
        } else {
          return Promise.resolve()
        }
      },
    },
  ],
}

const formRef = ref()
const formState = reactive<any>({})

const show = () => {
  open.value = true
  Object.assign(formState, {
    zhifenfangshi: undefined,
    zhifucanshu: '',
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
