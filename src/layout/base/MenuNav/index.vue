<template>
  <div class="menu-container">
    <a-menu
      class="menu"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :openKeys="layoutSettingStore.fold ? [] : state.openKeys"
      :items="items"
      :theme="layoutSettingStore.dark ? 'dark' : 'light'"
      @openChange="onOpenChange"
      @click="goRoute"
    ></a-menu>
  </div>
</template>

<script lang="ts" setup>
import resolveIcon from '@/utils/resolveIcon'
import { VueElement, reactive, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { ItemType, MenuProps } from 'ant-design-vue'
import type { MenuState } from './type'
import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()

defineOptions({ name: 'MenuNav' })

// 获取路由器对象
const $router = useRouter()
// 获取路由对象
const $route = useRoute()

// 获取父组件传递过来的全部路由数组
const props = defineProps<{ menuList: RouteRecordRaw[] }>()

// 生成菜单项
function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType
}

// 生成菜单列表项数组
const generateItemList = (list: RouteRecordRaw[]) => {
  const items: ItemType[] = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const meta: RouteMeta | undefined = item.meta
    const hidden = meta?.hidden
    if (hidden) continue

    // 标题
    const title = meta?.title
    // 路径
    const path = item.path
    // 图标字符串
    const icon = meta?.icon
    // 图标组件
    const iconComp = icon ? () => resolveIcon(icon as string) : null

    // 子路由
    const children = item.children?.filter((item) => !item.meta?.hidden)
    if (children && children.length > 1) {
      // 有子路由的情况
      items.push(
        getItem(title as string, path, iconComp, generateItemList(children)),
      )
    } else if (children && children.length === 1) {
      const onlyChild = children[0]
      items.push(getItem(title as string, onlyChild.path, iconComp))
    } else {
      // 没有子路由的情况
      // 生成菜单
      items.push(getItem(title as string, path, iconComp))
    }
  }
  return items
}

// 菜单项数组
const itemList = generateItemList(props.menuList)
const items: ItemType[] = reactive(itemList)

// 生成根节点key数组
const generateRootSubmenuKeys = (list: RouteRecordRaw[]) => {
  const keys: string[] = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    keys.push(item.path)
  }
  return keys
}
// 生成展开key数组
const generateOpenKeys = (list: RouteRecordRaw[]) => {
  return list.map((item) => item.path)
}
// 菜单状态属性记录
const state: MenuState = reactive({
  rootSubmenuKeys: generateRootSubmenuKeys(props.menuList),
  // 当菜单折叠时，不展开任何菜单
  openKeys: generateOpenKeys($route.matched),
  selectedKeys: [$route.path],
})

// 每次一只能打开一个菜单(手风琴模式)
const onOpenChange = (openKeys: string[]) => {
  // 当折叠菜单栏时，导致获取的openKeyds长度为0,直接跳过，不要赋值丢失了state.opendKeys的记录
  if (openKeys.length === 0) {
    return
  }
  const latestOpenKey = openKeys.find(
    (key) => state.openKeys.indexOf(key) === -1,
  )
  if (state.rootSubmenuKeys.indexOf(latestOpenKey as string) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}

// 菜单点击跳转路由
const goRoute: MenuProps['onClick'] = ({ key }: { key: any }) => {
  $router.push(key)
}

// 监听路径变化
watchEffect(() => {
  // 当路由切换时，更新菜单状态
  state.selectedKeys = [$route.path]
  state.openKeys = generateOpenKeys($route.matched)
})
</script>

<style scoped lang="scss">
.menu-container {
  height: calc(100% - $base-header-height);
  overflow-y: scroll;
  user-select: none;
}

.menu-container::-webkit-scrollbar {
  display: none;
}
</style>
