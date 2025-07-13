<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="图片" name="tuPianFile">
        <UploadImage v-model:value="formState.tuPianFile" />
      </a-form-item>
      <a-form-item label="时长" name="shichang">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.shichang"
          placeholder="请输入"
          :precision="2"
          addon-after="小时"
        />
      </a-form-item>
      <a-form-item label="原价" name="yuanjia">
        <a-input-number
          :min="0"
          :precision="2"
          v-model:value.trim="formState.yuanjia"
          placeholder="请输入"
          addon-after="元"
        />
      </a-form-item>
      <a-form-item label="优惠价" name="youhuijia">
        <a-input-number
          :min="0"
          :precision="2"
          v-model:value.trim="formState.youhuijia"
          placeholder="请输入"
          addon-after="元"
        />
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
import { reqAdd } from '@/api/AppConfig/MemberOrder'
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
  tuPianFile: [{ required: true, message: '请选择' }],
  shichang: [{ required: true, message: '请输入' }],
  yuanjia: [{ required: true, message: '请输入' }],
  youhuijia: [{ required: true, message: '请输入' }],
  shangxiajia: [{ required: true, message: '请选择' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    tuPianFile: undefined,
    shichang: '',
    yuanjia: '',
    youhuijia: '',
    shangxiajia: 1,
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)

    const formData = new FormData()
    formData.append('tuPianFile', formState.tuPianFile)
    formData.append('shichang', formState.shichang)
    formData.append('yuanjia', formState.yuanjia)
    formData.append('youhuijia', formState.youhuijia)
    formData.append('shangxiajia', formState.shangxiajia)

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
