<template>
  <a-layout class="layout-container">
    <a-layout-sider
      :class="{ 'layout-sider': layoutSettingStore.isMobile }"
      v-model:collapsed="layoutSettingStore.fold"
      collapsible
      :trigger="null"
      width="220px"
      :theme="layoutSettingStore.dark ? 'dark' : 'light'"
      :collapsedWidth="layoutSettingStore.collapsedWidth"
    >
      <Logo />
      <MenuNav :menuList="userStore.menuRoutes" />
    </a-layout-sider>
    <a-layout>
      <div ref="headerBar" class="layout-header">
        <Navbar />
        <MultiTab />
      </div>
      <a-layout-content
        class="layout-content"
        :class="{ mobile: layoutSettingStore.isMobile }"
      >
        <RouterView v-if="!layoutSettingStore.refresh" />
        <Side />
      </a-layout-content>
      <!-- 遮罩 -->
      <div
        class="mask"
        v-if="layoutSettingStore.isMobile && !layoutSettingStore.fold"
        @click="layoutSettingStore.fold = true"
      ></div>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { watch, nextTick, computed, ref } from 'vue'
import Logo from './Logo/index.vue'
import MenuNav from './MenuNav/index.vue'
import Navbar from './Navbar/index.vue'
import Side from './Side/index.vue'
import MultiTab from '@/components/MultiTab/index.vue'

// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()

const headerBar = ref()
const headerBarHeight = computed(() => {
  return `${headerBar.value.offsetHeight}px`
})

// 监听二级路由刷新状态改变
watch(
  () => layoutSettingStore.refresh,
  () => {
    nextTick(() => {
      layoutSettingStore.refresh = false
    })
  },
)
</script>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
  position: relative;

  .layout-sider {
    z-index: 2;
  }

  .layout-content {
    overflow-y: auto;

    &.mobile {
      position: absolute;
      top: v-bind(headerBarHeight);
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
  }

  .mask {
    background-color: rgba($color: #000000, $alpha: 0.6);
    height: calc(100vh - $base-header-height);
    z-index: 2;
  }
}
</style>
