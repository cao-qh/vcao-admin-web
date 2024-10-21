<template>
  <a-modal title="批量导入" :open="open" @cancel="close">
    <div style="padding: 20px 10px">
      <a-upload
        v-if="resultInfo == null"
        v-model:file-list="fileList"
        :before-upload="beforeUpload"
        :maxCount="1"
        accept=".xls,.xlsx"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          请选择文件
        </a-button>
      </a-upload>
      <div v-else>
        <p>成功数：{{ resultInfo.success }}</p>
        <p>失败数：{{ resultInfo.error }}</p>
      </div>
    </div>
    <template #footer>
      <a-button key="back" @click="close">
        {{ resultInfo == null ? '取消' : '知道了' }}
      </a-button>
      <a-button
        v-if="resultInfo == null"
        key="submit"
        type="primary"
        @click="submit"
      >
        确定
      </a-button>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAddBatch } from '@/api/table/search/index'
import type { UploadProps } from 'ant-design-vue'

defineOptions({ name: 'BatchImport' })
// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

const fileList = ref<any[]>([])

const resultInfo = ref<null | { success: number; error: number }>(null)

const show = () => {
  open.value = true
  fileList.value = []
}

const submit = async () => {
  if (fileList.value.length == 0) {
    message.error('请选择文件')
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', fileList.value[0].originFileObj)
    const res = await reqAddBatch(formData)
    if (res.code == 0) {
      $emit('success')
      message.success(res.msg)
      resultInfo.value = res.data
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

const close = () => {
  resultInfo.value = null
  open.value = false
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  fileList.value = [...(fileList.value || []), file]
  return false
}

defineExpose({
  show,
})
</script>
