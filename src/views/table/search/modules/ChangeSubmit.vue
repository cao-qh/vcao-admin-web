<template>
  <a-modal
    title="更换通道并提单"
    :open="open"
    @ok="submit"
    @cancel="open = false"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="订单号" name="dingdanhao">
        <a-input v-model:value="formState.dingdanhao" disabled />
      </a-form-item>
      <a-form-item label="通道" name="tongdao">
        <a-select v-model:value="formState.tongdao">
          <a-select-option v-for="(v, k) in channel" :key="k" :value="+k">
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
import { reqUpdateSubmit } from '@/api/table/search/index'
import AddressSelector from '@/components/AddressSelector/index.vue'

defineOptions({ name: 'ChangeSubmit' })

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

const show = async (row: Record) => {
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
