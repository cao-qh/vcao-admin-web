<template>
  <a-tooltip
    :overlayInnerStyle="{ 'max-height': '300px', 'overflow-y': 'auto' }"
  >
    <template v-if="showTip" #title>
      <span class="copy-btn" @click="copy">点此复制</span>
      <div>
        {{ content }}
      </div>
    </template>
    <div
      ref="contentRef"
      style="
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      "
    >
      {{ content }}
    </div>
  </a-tooltip>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { copy2clipboard } from '@/utils/copy2clipboard'
import { message } from 'ant-design-vue'

const { content } = defineProps<{
  content: string
}>()

const contentRef = ref<HTMLElement>()
const showTip = ref(false)

onMounted(() => {
  const element = contentRef.value as HTMLElement
  if (element.scrollWidth > element.clientWidth) {
    // console.log('文本超出元素宽度')
    showTip.value = true
  }
})

const copy = async () => {
  try {
    await copy2clipboard(content)
    // 使用项目现有通知组件
    message.success('复制成功')
  } catch (err) {
    message.error('复制失败，请手动复制。')
  }
}
</script>

<style scoped>
.copy-btn {
  padding: 2px;
  color: #4dabf7;
  cursor: pointer;
  user-select: none;
  background-color: #262626;
  position: sticky;
  top: 0px;
  border-radius: 5px;
}
</style>
