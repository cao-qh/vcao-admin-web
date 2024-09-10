<template>
  <a-modal title="添加记录" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item label="通道" name="tongdao">
        <a-select v-model:value="formState.tongdao">
          <a-select-option v-for="(v, k) in channel" :key="k" :value="k">
            {{ v }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="面值" name="mianzhi">
        <a-select v-model:value="formState.mianzhi">
          <a-select-option v-for="(v, k) in faceValue" :key="k" :value="k">
            {{ v }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="收货地址" name="address">
        <AddressSelector v-model:value="formState.address" />
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
import type { Record } from '@/api/table/search/type'
import { reqAdd } from '@/api/table/search/index'
import { phone } from '@/utils/regexp'
import AddressSelector from '@/components/AddressSelector/index.vue'
import { address } from '@/utils/regexp'

defineOptions({ name: 'Add' })
// 属性
defineProps({
  channel: {
    type: Object,
    default: () => {},
  },
  faceValue: {
    type: Object,
    default: () => {},
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
const formState = reactive<Record>({})

const rules = {
  phone: [
    { required: true, message: '请输入电话' },
    {
      pattern: phone,
      message: '请输入正确的手机号',
    },
  ],
  mianzhi: [{ required: true, message: '请选择面值' }],
  tongdao: [{ required: true, message: '请选择通道' }],
  address: [
    { required: true, message: '请选择地址' },
    { pattern: address, message: '请输入正确的地址' },
  ],
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
