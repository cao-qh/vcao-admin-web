<template>
  <a-modal
    title="批量导入"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :width="700"
    :body-style="{ maxHeight: '580px', overflow: 'auto' }"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="缩略图" name="fileSLTs">
        <a-upload
          v-model:file-list="formState.fileList"
          :before-upload="beforeUpload"
          list-type="picture-card"
          @preview="handlePreview"
        >
          <div>
            <plus-outlined />
            <div style="margin-top: 8px">选择文件</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="参数" name="jsonStr">
        <a-textarea :rows="10" v-model:value="formState.jsonStr" />
      </a-form-item>
    </a-form>
  </a-modal>

  <ImageViewer ref="imageViewer" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqUploadChapter } from '@/api/VideoManager/VideoCollection'
import type { UploadProps } from 'ant-design-vue'
import ImageViewer from '@/components/ImageViewer/index.vue'
import file2base64 from '@/utils/file2base64'

defineOptions({ name: 'BatchImport' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

// 表单布局
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}

const formRef = ref()
const formState = reactive<any>({
  fileList: [],
  jsonStr: '',
})

const imageViewer = ref()

const show = async () => {
  open.value = true
  formState.fileList = []
  formState.jsonStr = ''
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  formState.fileList.value = [...(formState.fileList.value || []), file]
  return false
}

const handlePreview = async (file: any) => {
  const url = (await file2base64(file.originFileObj)) as string
  imageViewer.value.show(file.name, url)
}

const submit = async () => {
  try {
    await formRef.value.validate()

    console.log('formState :>> ', formState)

    const formData = new FormData()
    formState.fileList.forEach((item: any) => {
      formData.append('fileSLTs', item.originFileObj)
    })
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
