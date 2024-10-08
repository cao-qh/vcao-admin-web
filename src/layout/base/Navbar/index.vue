<template>
  <a-row class="navbar">
    <a-col :span="5">
      <component
        style="font-size: 20px"
        :is="
          layoutSettingStore.fold ? 'MenuFoldOutlined' : 'MenuUnfoldOutlined'
        "
        @click="changeManuFold"
      ></component>
    </a-col>
    <a-col :span="19">
      <a-flex justify="end" align="center">
        <a-space size="middle">
          <a-space size="middle" v-if="navBtns">
            <a-button
              :icon="h(resolveComponent('ReloadOutlined'))"
              size="small"
              @click="reload"
            />
            <a-button
              :icon="
                h(
                  resolveComponent(
                    fullScreenStatus
                      ? 'FullscreenExitOutlined'
                      : 'FullscreenOutlined',
                  ),
                )
              "
              size="small"
              @click="fullScreen"
            />
            <a-button
              :icon="h(resolveComponent('SettingOutlined'))"
              size="small"
              @click="setting"
            />
            <!-- <Notice @click="handleNotice" /> -->
          </a-space>

          <a-dropdown>
            <span>
              {{ userStore.username }}
              <DownOutlined />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="userStore.userLogout">退出登录</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </a-flex>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { h, resolveComponent, watchEffect, ref, computed } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
// import Notice from '@/components/Notice/index.vue'
// import { useRouter } from 'vue-router'

// const $router = useRouter()

// 获取layout配置相关的仓库
const layoutSettingStore = useLayoutSettingStore()
// 获取用户相关的仓库
const userStore = useUserStore()

// 导航颜色
const color = computed(() => {
  const color = {
    bgColor: '#fff',
    color: '#000',
  }
  if (layoutSettingStore.dark) {
    color.bgColor = '#000'
    color.color = '#fff'
  }
  return color
})

// 改变菜单折叠
const changeManuFold = () => {
  // 改变菜单折叠状态
  layoutSettingStore.fold = !layoutSettingStore.fold
}
// 刷新二级路由页面
const reload = () => {
  layoutSettingStore.refresh = true
}

const fullScreenStatus = ref<boolean>(false)
// 全屏
const fullScreen = () => {
  const full = document.fullscreenElement
  // DOM对象的额一个属性：可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
  if (full) {
    // 退出全屏
    document.exitFullscreen()
    fullScreenStatus.value = false
  } else {
    document.documentElement.requestFullscreen()
    fullScreenStatus.value = true
  }
}

// 设置按钮
const setting = () => {
  layoutSettingStore.side = true
}

// 延迟显示导航按钮
const navBtns = ref(false)
watchEffect(() => {
  if (!(layoutSettingStore.isMobile && !layoutSettingStore.fold)) {
    setTimeout(() => {
      navBtns.value = true
    }, 150)
  } else {
    navBtns.value = false
  }
})

// const handleNotice = () => {
//   $router.push({ name: 'NoticeUp' })
// }
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 10px;
  height: $base-header-height;
  line-height: $base-header-height;
  background-color: v-bind('color.bgColor');
  color: v-bind('color.color');
}
</style>
