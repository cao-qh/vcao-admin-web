<template>
  <a-modal
    title="批量导入"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :body-style="{ maxHeight: '580px', overflow: 'auto' }"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="缩略图" name="fileSLTs">
        <UploadImage v-model:value="formState.fileSLTs" />
      </a-form-item>
      <a-form-item label="参数" name="jsonStr">
        <a-textarea v-model:value="formState.jsonStr" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqUploadChapter } from '@/api/VideoManager/VideoCollection'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'BatchImport' })

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
  fileSLTs: [{ required: true, message: '请选择' }],
  jsonStr: [{ required: true, message: '请输入' }],
}

const show = async () => {
  open.value = true
  formState.fileSLTs = null
  formState.jsonStr = ''
}

const submit = async () => {
  try {
    await formRef.value.validate()

    console.log('formState :>> ', formState)

    const formData = new FormData()
    formData.append('fileSLTs', formState.fileSLTs)
    formData.append('jsonStr', formState.jsonStr)

    const res = await reqUploadChapter(formData)
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
