<template>
  <a-modal
    title="产品详情"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :maskClosable="false"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="产品编码" name="chanpinBianma">
        <a-input v-model:value="formState.chanpinBianma" disabled />
      </a-form-item>
      <a-form-item label="产品详情" name="chanpinXiangqing">
        <a-textarea v-model:value="formState.chanpinXiangqing"></a-textarea>
      </a-form-item>
      <a-form-item label="返佣说明" name="fanyongshuoming">
        <a-textarea v-model:value="formState.fanyongshuoming"></a-textarea>
      </a-form-item>
      <a-form-item label="宣传图" name="fileXC">
        <UploadImage v-model:value="formState.fileXC" />
      </a-form-item>
      <a-form-item label="落地页图" name="fileLD">
        <UploadImage v-model:value="formState.fileLD" />
      </a-form-item>
      <a-form-item label="确认页面图" name="fileQR">
        <UploadImage v-model:value="formState.fileQR" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqDetail, reqEditDetail } from '@/api/admin/goods'
import UploadImage from '@/components/UploadImage/index.vue'

const imgBase = import.meta.env.VITE_APP_IMG_BASE

defineOptions({ name: 'EditDetail' })

defineProps<{
  disPlatform: any
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

const show = async (row: any) => {
  formRef.value?.clearValidate()
  const res: any = await reqDetail({ chanpinBianma: row.bianma })
  if (res.code == 0) {
    open.value = true
    formState.id = res.data.id
    formState.chanpinBianma = res.data.chanpinBianma
    formState.chanpinXiangqing = res.data.chanpinXiangqing
    formState.fanyongshuoming = res.data.fanyongshuoming
    formState.fileXC = imgBase + res.data.xuanchuantuUrl
    formState.fileLD = imgBase + res.data.luodiyeUrl
    formState.fileQR = imgBase + res.data.querentuUrl
  } else {
    message.error(res.message)
  }
}

const rules = {
  chanpinXiangqing: [{ required: true, message: '请输入' }],
  fanyongshuoming: [{ required: true, message: '请输入' }],
  fileXC: [{ required: true, message: '请选择' }],
  fileLD: [{ required: true, message: '请选择' }],
  fileQR: [{ required: true, message: '请选择' }],
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const formData = new FormData()
    Object.keys(formState).forEach((key) => {
      if (formState[key] !== undefined && formState[key] !== null) {
        if (key === 'fanyongshuoming' || key === 'chanpinXiangqing') {
          formData.append(key, formState[key].trim())
        } else {
          formData.append(key, formState[key])
        }
      }
    })
    const res = await reqEditDetail(formData)
    if (res.code == 0) {
      message.success('修改成功')
      $emit('success')
      open.value = false
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
