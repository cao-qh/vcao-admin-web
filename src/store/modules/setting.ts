// 小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { TabList } from '@/layout/base/MultiTab/type'

const useLayoutSettingStore = defineStore('settingStore', () => {
  const settings = JSON.parse(localStorage.getItem('SETTINGS') as string)
  const sessionData = JSON.parse(sessionStorage.getItem('SETTINGS') as string)

  const fold = ref(sessionData?.fold || false) // 左侧layout.side是否折叠
  const collapsedWidth = ref(50) // 左侧layout.side折叠宽度

  const refresh = ref(false) // 刷新页面状态
  const side = ref(false) // 右侧主题设置抽屉状态
  const dark = ref(settings?.dark || false) // 是否为暗黑
  const themeColor = ref(settings?.themeColor || '#68361a') // 主题色
  const isMobile = ref(false) // 是否为移动端

  const tabList = ref<TabList>([])

  // 当暗黑模式和主题色变化时，更新本地存储
  watch(
    [dark, themeColor],
    () => {
      localStorage.setItem(
        'SETTINGS',
        JSON.stringify({ dark: dark.value, themeColor: themeColor.value }),
      )
    },
    { immediate: true },
  )

  // 当切换到手机模式时，收起左侧菜单
  watch(isMobile, () => {
    if (isMobile.value) {
      fold.value = true
      collapsedWidth.value = 0
    } else {
      collapsedWidth.value = 50
    }
  })

  // 当折叠变化时，更新会话存储
  watch(fold, () => {
    sessionStorage.setItem('SETTINGS', JSON.stringify({ fold: fold.value }))
  })

  return {
    fold,
    collapsedWidth,
    refresh,
    side,
    dark,
    themeColor,
    isMobile,
    tabList,
  }
})

export default useLayoutSettingStore
