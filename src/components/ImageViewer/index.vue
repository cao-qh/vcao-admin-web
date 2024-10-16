<template>
  <a-modal
    :open="previewVisible"
    :title="previewTitle"
    :footer="null"
    @cancel="handleCancel"
  >
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 以下是预览
const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')

const show = (title: string, url: string) => {
  previewVisible.value = true
  previewTitle.value = title
  previewImage.value = url
}

const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}

defineExpose({ show })
</script>

<style></style>
