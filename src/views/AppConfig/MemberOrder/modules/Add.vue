<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="图片" name="tp">
        <UploadImage v-model:value="formState.tp" />
      </a-form-item>
      <a-form-item label="时长" name="sc">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.sc"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="原价" name="yj">
        <a-input-number
          :min="0"
          :precision="2"
          v-model:value.trim="formState.yj"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="优惠价" name="yhj">
        <a-input-number
          :min="0"
          :precision="2"
          v-model:value.trim="formState.yhj"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="上下架" name="sxj">
        <a-radio-group v-model:value="formState.sxj">
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
import { reqAdd } from '@/api/table/search/index'
import UploadImage from '@/components/UploadImage/index.vue'

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
  tp: [{ required: true, message: '请选择' }],
  sc: [{ required: true, message: '请输入' }],
  yj: [{ required: true, message: '请输入' }],
  yhj: [{ required: true, message: '请输入' }],
  sxj: [{ required: true, message: '请选择' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    tp: undefined,
    sc: '',
    yj: '',
    yhj: '',
    sxj: 1,
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
