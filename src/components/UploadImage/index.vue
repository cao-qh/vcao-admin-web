<template>
  <div>
    <a-upload
      v-if="show"
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
      <div class="upload-preview" v-else-if="typeof model === 'string'">
        <a-image
          width="100%"
          height="100%"
          :src="String(model)"
          :preview="false"
          alt=""
        />
        <a-button
          v-if="deleteable"
          class="upload-delete"
          size="small"
          type="text"
          @click.stop="handleRemoveCustome"
        >
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
      </div>
    </a-upload>

    <ImageViewer ref="imageViewer" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { UploadProps } from 'ant-design-vue'
import file2base64 from '@/utils/file2base64'
import ImageViewer from '@/components/ImageViewer/index.vue'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'UploadImage',
})

withDefaults(defineProps<{ deleteable?: boolean }>(), { deleteable: false })

const show = ref(true)
const model = defineModel<object | string | null>('value')
const upload = ref()

watch(model, (val) => {
  if (val == null) {
    upload.value.fileList = []
  } else if (typeof val === 'string') {
    upload.value.fileList = []
  }
})

// 上传前回调
const handleBeforeUpload: UploadProps['beforeUpload'] = async (file) => {
  console.log(file)
  if (file.size > 1 * 1024 * 1024) {
    message.warning('图片大小不能超过1MB')
    // 重置 上传组件 防止超过大小限制的图片显示上去
    show.value = false
    nextTick(() => {
      show.value = true
    })
    return false
  } else {
    model.value = file
    return false
  }
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

// 处理删除按钮
const handleRemoveCustome = () => {
  model.value = null
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

.upload-preview {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .upload-delete {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
}
</style>
