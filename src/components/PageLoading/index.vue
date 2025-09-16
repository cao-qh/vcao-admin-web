<template>
  <Teleport to="body">
    <div class="page-loading" v-if="open">
      <a-spin :spinning="true" size="large" />
      <div class="text">请稍等</div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import useSettingStore from '@/store/modules/setting'
import useLayoutSettingStore from '@/store/modules/setting'

const settingStore = useSettingStore()
const layoutSettingStore = useLayoutSettingStore()
const open = ref(false)
const timer = ref<any>(null)
const delay = 300
const time = ref(0)

const color = computed(() => {
  if (layoutSettingStore.dark) {
    return {
      bg: 'rgb(20, 20, 20, 0)',
      text: '#fff',
    }
  } else {
    return {
      bg: 'rgb(255, 255, 255, 0)',
      text: '#888888',
    }
  }
})

watch(
  () => settingStore.pageLoading,
  (val) => {
    // 防闪设计，页面加载中最小展示300毫秒
    if (val) {
      if (timer.value) clearTimeout(timer.value)
      open.value = true
      time.value = Date.now()
    } else {
      // 如果小于delay，显示最小时长
      const sub = Date.now() - time.value
      if (sub < delay) {
        timer.value = setTimeout(() => {
          open.value = false
        }, delay)
      } else {
        open.value = false
      }
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.page-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: v-bind('color.bg');
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    color: v-bind('color.text');
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
