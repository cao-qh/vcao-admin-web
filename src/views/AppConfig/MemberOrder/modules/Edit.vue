<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="图片" name="tuPianFile">
        <UploadImage v-model:value="formState.tuPianFile" />
      </a-form-item>
      <a-form-item label="时长" name="shichang">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.shichang"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="原价" name="yuanjia">
        <a-input-number
          :min="0"
          :precision="2"
          v-model:value.trim="formState.yuanjia"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="优惠价" name="youhuijia">
        <a-input-number
          :min="0"
          :precision="2"
          v-model:value.trim="formState.youhuijia"
          placeholder="请输入"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/AppConfig/MemberOrder'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Edit' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)
const baseUrl = import.meta.env.VITE_SERVE

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
}

const show = async (row: any) => {
  open.value = true
  formState.id = row.id
  formState.tuPianFile = baseUrl + row.tupian
  formState.shichang = row.shichang
  formState.yuanjia = row.yuanjia
  formState.youhuijia = row.youhuijia
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const formData = new FormData()
    formData.append('id', formState.id)
    formData.append('tuPianFile', formState.tuPianFile)
    formData.append('shichang', formState.shichang)
    formData.append('yuanjia', formState.yuanjia)
    formData.append('youhuijia', formState.youhuijia)

    const res = await reqEdit(formData)
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
