<template>
  <div>
    <a-upload
      accept="image/png, image/jpeg"
      list-type="picture-card"
      :maxCount="1"
      :before-upload="handleBeforeUpload"
      @remove="handleRemove"
      @preview="handlePreview"
    >
      <div class="upload-selector" v-if="!model">
        <PlusOutlined />
        <span>选择图片</span>
      </div>
    </a-upload>
    <a-modal
      :open="previewVisible"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
      @preview="handlePreview"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadProps } from 'ant-design-vue'
import file2base64 from '@/utils/file2base64'

const model = defineModel('value')

// 上传前回调
const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
  model.value = file
  return false
}
// 处理删除
const handleRemove: UploadProps['onRemove'] = () => {
  model.value = null
}

const handlePreview = async (file: any) => {
  previewImage.value = (await file2base64(file.originFileObj)) as string
  previewVisible.value = true
  previewTitle.value = file.name
}

// 以下是预览
const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')

const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}
</script>

<style scoped lang="scss">
.upload-selector {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  > span {
    font-size: 12px;
  }
}
</style>
