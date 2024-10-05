<template>
  <a-modal
    title="配置"
    :open="open"
    @ok="submit"
    :rules="rules"
    @cancel="open = false"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="产品编码" name="chanpinBianma">
        <a-input v-model:value="formState.chanpinBianma" disabled />
      </a-form-item>
      <a-form-item label="代理编码" name="dailiBianma">
        <a-input v-model:value="formState.dailiBianma" disabled />
      </a-form-item>
      <a-form-item label="结算方式" name="jiesuanfangshi">
        <a-select v-model:value="formState.jiesuanfangshi" placeholder="请选择">
          <a-select-option
            v-for="item in settlement"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="结算周期" name="jiesuanzhouqi">
        <a-select v-model:value="formState.jiesuanzhouqi" placeholder="请选择">
          <a-select-option
            v-for="item in jiesuanzhouqi"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="代理佣金金额" name="dailiYongjinJine">
        <a-input-number
          :min="0"
          v-model:value="formState.dailiYongjinJine"
          :precision="2"
          placeholder="请输入"
        >
          <template #addonAfter>
            <span>元</span>
          </template>
        </a-input-number>
      </a-form-item>
      <a-form-item label="上下架" name="shangxiajia">
        <a-radio-group v-model:value="formState.shangxiajia">
          <a-radio-button :value="1">上架</a-radio-button>
          <a-radio-button :value="2">下架</a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqConfigProduct } from '@/api/admin/channel/agent'

defineOptions({ name: 'Config' })

defineProps<{
  settlement: any
  jiesuanzhouqi: any
}>()

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
  dailiYongjinJine: [{ required: true, message: '请输入' }],
  shangxiajia: [{ required: true, message: '请选择' }],
  jiesuanfangshi: [{ required: true, message: '请选择' }],
  jiesuanzhouqi: [{ required: true, message: '请选择' }],
}

const show = async (row: any, DLbianma: string) => {
  open.value = true
  formState.chanpinBianma = row.chanpinbianma
  formState.dailiBianma = DLbianma
  formState.jiesuanfangshi = null
  formState.jiesuanzhouqi = null
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res = await reqConfigProduct([formState])
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
