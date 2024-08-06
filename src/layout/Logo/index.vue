<template>
  <div
    v-if="!setting.logoHidden"
    class="logo"
    :class="{ fold: layoutSettingStore.fold }"
  >
    <img :src="setting.logo" alt="logo" />
    <span>{{ setting.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()

defineOptions({
  name: 'Logo',
})

const color = computed(() => {
  return layoutSettingStore.dark ? '#d9d9d9' : layoutSettingStore.themeColor
})
</script>

<style scoped lang="scss">
.logo {
  height: $base-logo-height;
  line-height: calc($base-logo-height - 20px);
  padding: 5px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
  overflow: hidden;

  img {
    height: 100%;
  }

  span {
    margin-left: 8px;
    font-size: 18px;
    font-weight: bold;
    height: 100%;
    line-height: 39px;
    color: v-bind(color);
  }

  &.fold {
    height: 41px;
    span {
      display: none;
    }
  }
}
</style>
