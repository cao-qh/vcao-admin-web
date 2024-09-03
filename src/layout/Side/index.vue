<template>
  <a-drawer
    title="主题设置"
    :open="layoutSettingStore.side"
    @close="layoutSettingStore.side = false"
  >
    <a-form :wrapper-col="{ span: 24 }">
      <a-form-item label="主题颜色">
        <a-flex justify="space-between" align="center">
          <a-input
            type="color"
            v-model:value="color"
            @blur="changeThemeColor"
            style="width: 32px; padding: 0"
          />
          <a-button @click="resetThemeColor" size="small">默认</a-button>
        </a-flex>
      </a-form-item>
      <a-form-item label="暗黑模式">
        <sun-moon v-model="layoutSettingStore.dark"></sun-moon>
      </a-form-item>
      <a-divider></a-divider>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import SunMoon from '@/components/SunMoon/index.vue'

defineOptions({
  name: 'Side',
})

const layoutSettingStore = useLayoutSettingStore()
const color = ref(layoutSettingStore.themeColor)

const changeThemeColor = () => {
  layoutSettingStore.themeColor = color.value
}

const resetThemeColor = () => {
  layoutSettingStore.themeColor = '#1890FF'
  color.value = '#1890FF'
}
</script>

<style></style>
