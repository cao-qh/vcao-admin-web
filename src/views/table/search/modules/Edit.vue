<template>
  <a-modal
    title="修改"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :body-style="{ maxHeight: '580px', overflow: 'auto' }"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="订单号" name="dingdanhao">
        <a-input v-model:value="formState.dingdanhao" disabled />
      </a-form-item>
      <a-form-item label="通道" name="tongdao">
        <a-select v-model:value="formState.tongdao" placeholder="请选择">
          <a-select-option
            v-for="item in channel"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="面值" name="mianzhi">
        <a-select v-model:value="formState.mianzhi" placeholder="请选择">
          <a-select-option
            v-for="item in faceValue"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="收货地址" name="address">
        <AddressSelector v-model:value="formState.address" />
      </a-form-item>
      <a-form-item label="备注" name="beizhu">
        <a-textarea
          v-model:value.trim="formState.beizhu"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/table/search/index'
import AddressSelector from '@/components/AddressSelector/index.vue'

defineOptions({ name: 'Edit' })

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
const formState = reactive<any>({})

const rules = {
  dingdanhao: [{ required: true, message: '请输入' }],
  tongdao: [{ required: true, message: '请选择' }],
}

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

    const res = await reqEdit(formState)
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
