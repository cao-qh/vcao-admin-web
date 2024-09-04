<template>
  <div>
    <a-upload
      ref="upload"
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

    <ImageViewer ref="imageViewer" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { UploadProps } from 'ant-design-vue'
import file2base64 from '@/utils/file2base64'
import ImageViewer from '@/components/ImageViewer/index.vue'

defineOptions({
  name: 'UploadImage',
})

const model = defineModel('value')
const upload = ref()

watch(model, (val) => {
  if (!val) {
    upload.value.fileList = []
  }
})

// 上传前回调
const handleBeforeUpload: UploadProps['beforeUpload'] = async (file) => {
  model.value = file
  return false
}

// 处理删除
const handleRemove: UploadProps['onRemove'] = () => {
  model.value = null
  // 避免和上面watch监听冲突
  return false
}

const handlePreview = async (file: any) => {
  const url = (await file2base64(file.originFileObj)) as string
  imageViewer.value.show(file.name, url)
}

const imageViewer = ref()
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
