<template>
  <div class="breadcrumb" :class="{ dark: layoutSettingStore.dark }">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else :to="route.path">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Route } from './type'
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()

// 使用路由对象
const $route = useRoute()
const randerBreadcrumb: Route[] = $route.matched.map(
  (item): Route => ({
    path: item.path,
    breadcrumbName: item.meta.title as string,
  }),
)
const routes = ref<Route[]>([
  {
    path: '/',
    breadcrumbName: '主页',
  },
  ...randerBreadcrumb,
])
</script>

<style lang="scss" scoped>
.breadcrumb {
  background-color: #fff;
  border-top: 1px solid #ecf0f1;
  border-bottom: 1px solid #ecf0f1;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.dark {
  background-color: #141414;
  border-top: 1px solid #434343;
  border-bottom: 1px solid #434343;
}
</style>
