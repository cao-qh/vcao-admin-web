<template>
  <div class="multi-tab" :class="{ dark: layoutSettingStore.dark }">
    <a-tabs
      type="editable-card"
      :hideAdd="true"
      v-model:activeKey="activeKey"
      :tab-position="mode"
      :style="{ height: '100%', width: '100%' }"
      @tabClick="tabClick"
    >
      <a-tab-pane v-for="item in layoutSettingStore.tabList" :key="item.name">
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span class="tab-btn">{{ item.title }}</span>
            <template #overlay>
              <a-menu @click="($event: any) => onMenuClick($event, item)">
                <a-menu-item key="other">关闭其他</a-menu-item>
                <a-menu-item key="left">关闭左侧</a-menu-item>
                <a-menu-item key="rigth">关闭右侧</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
        <template #closeIcon>
          <CloseOutlined @click="onClocse(item.name)" />
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import type { TabsProps } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import type { TabItem } from './type'

defineOptions({ name: 'MultiTab' })

const layoutSettingStore = useLayoutSettingStore()
const mode = ref<TabsProps['tabPosition']>('top')
const activeKey = ref('')
const $route = useRoute()
const $router = useRouter()

watch(
  () => $route.path,
  (val) => {
    // 已有有的不添加
    if (layoutSettingStore.tabList.some((item) => item.name === $route.name)) {
      activeKey.value = $route.name?.toString() as string
      return
    }
    layoutSettingStore.tabList.push({
      path: val,
      title: $route.meta.title?.toString() as string,
      name: $route.name?.toString() as string,
    })
    activeKey.value = $route.name?.toString() as string
  },
  {
    immediate: true,
  },
)

// 监听tabList
// watch(
//   () => layoutSettingStore.tabList,
//   (val) => {
//     sessionStorage.setItem('tabList', JSON.stringify(val))
//   },
//   { deep: true },
// )

// 管理tab
const onClocse = (name: string) => {
  // 小于1个不删除
  if (layoutSettingStore.tabList.length <= 1) {
    return
  }
  if (activeKey.value === name) {
    const index = layoutSettingStore.tabList.findIndex(
      (item) => item.name === name,
    )
    if (layoutSettingStore.tabList.length >= 2 && index !== -1) {
      if (index === layoutSettingStore.tabList.length - 1) {
        $router.push({ name: layoutSettingStore.tabList[index - 1].name })
      } else {
        $router.push({ name: layoutSettingStore.tabList[index + 1].name })
      }
    }
  }
  // 删除tab
  layoutSettingStore.tabList = layoutSettingStore.tabList.filter(
    (item) => item.name !== name,
  )
}

// tab点击
const tabClick = (key: string) => {
  // 跳转页面
  $router.push({ name: key })
}

// 当右键菜单点击
const onMenuClick = ({ key }: any, item: TabItem) => {
  switch (key) {
    case 'other':
      closeOther(item)
      break
    case 'left':
      closeLeft(item)
      break
    case 'rigth':
      closeRight(item)
      break
    default:
      break
  }
}

// 关闭除了当前的其他tab
const closeOther = (tabItem: TabItem) => {
  const current = layoutSettingStore.tabList.find(
    (item) => item.name === tabItem.name,
  )
  if (!current) return
  layoutSettingStore.tabList = [current]
  $router.push({ name: current.name })
}

// 关闭tabItem左侧的tab
const closeLeft = (tabItem: TabItem) => {
  const index = layoutSettingStore.tabList.findIndex(
    (item) => item.name === tabItem.name,
  )
  if (index === -1 || index === 0) return
  // 删除index开始左侧的
  layoutSettingStore.tabList = layoutSettingStore.tabList.slice(index)
  const activeIndex = layoutSettingStore.tabList.findIndex(
    (item) => item.name === activeKey.value,
  )
  if (activeIndex === -1) {
    $router.push({ name: tabItem.name })
  }
}

// 关闭tabItem右侧的tab
const closeRight = (tabItem: TabItem) => {
  const index = layoutSettingStore.tabList.findIndex(
    (item) => item.name === tabItem.name,
  )
  if (index === -1 || index === layoutSettingStore.tabList.length - 1) return
  // 删除index开始右侧的
  layoutSettingStore.tabList = layoutSettingStore.tabList.slice(0, index + 1)
  const activeIndex = layoutSettingStore.tabList.findIndex(
    (item) => item.name === activeKey.value,
  )
  if (activeIndex === -1) {
    $router.push({ name: tabItem.name })
  }
}
</script>

<style scoped>
.multi-tab {
  background-color: #fff;
  border-top: 1px solid #ecf0f1;
  border-bottom: 1px solid #ecf0f1;
  height: 39px;
  display: flex;
  align-items: center;
  user-select: none;

  .tab-btn {
    display: inline-block;
    height: 100%;
    width: 100%;
    /* background-color: red; */
    padding: 7px 0 7px 15px;
  }
}
.dark {
  background-color: #141414;
  border-top: 1px solid #434343;
  border-bottom: 1px solid #434343;
}
</style>

<style>
.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab {
  padding: 0;
}
.ant-tabs .ant-tabs-tab-remove {
  margin: 0;
}
.ant-tabs .ant-tabs-tab-btn {
  width: 100%;
  height: 100%;
}
</style>
