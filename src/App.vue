<template>
  <a-config-provider
    :locale="locale"
    :theme="{
      algorithm: layoutSettingStore.dark
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm,
      token: {
        colorPrimary: layoutSettingStore.themeColor,
        borderRadius: 3,
      },
    }"
  >
    <RouterView />
    <PageLoading />
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { theme } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import useLayoutSettingStore from '@/store/modules/setting'
import PageLoading from '@/components/PageLoading/index.vue'

const layoutSettingStore = useLayoutSettingStore()
dayjs.locale('zh-cn')
const locale = ref(zhCN)

// 检测当前是移动端还是pc端
onMounted(() => {
  const mediaQueryList: MediaQueryList = window.matchMedia('(max-width: 768px)')
  mediaQueryList.addEventListener('change', updateDeviceType)
  // 首次调用监听
  updateDeviceType(mediaQueryList as unknown as MediaQueryListEvent)

  onUnmounted(() => {
    mediaQueryList.removeEventListener('change', updateDeviceType)
  })
})
const updateDeviceType = (e: MediaQueryListEvent) => {
  layoutSettingStore.isMobile = e.matches
}
</script>
