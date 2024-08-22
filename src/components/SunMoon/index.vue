<template>
  <div class="sun-moon holder" :class="{ leftChecked }">
    <span class="icon" @click="handleSun">
      <SvgIcon name="sun" :color="iconColor.sun" />
    </span>
    <span class="icon" @click="handleMoon">
      <SvgIcon name="moon" :color="iconColor.moon" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'

const settingStore = useLayoutSettingStore()

const leftChecked = ref(!settingStore.dark)
const iconColor = computed(() => {
  return {
    sun: settingStore.dark ? '#a3b1bf' : '#fff',
    moon: settingStore.dark ? '#fff' : '#a3b1bf',
  }
})

// 当太阳被点击
const handleSun = () => {
  leftChecked.value = true
  settingStore.dark = false
}

// 当月亮被点击
const handleMoon = () => {
  leftChecked.value = false
  settingStore.dark = true
}
</script>

<style lang="scss" scoped>
.sun-moon {
  position: relative;
  display: inline-flex;
  background: #ebedf0;
  border-radius: 100vw;
  cursor: pointer;
  transition: all 0.3s;

  .icon {
    position: relative;
    width: 32px;
    height: 32px;
    color: #a3b1bf;
    line-height: 32px;
    text-align: center;
    transition: all 0.3s;
    font-size: 19px;

    /*  .icon.active {
      color: #fff;
    } */
  }
}

.holder::before {
  position: absolute;
  top: 0;
  left: calc(100% - 32px);
  width: 32px;
  height: 32px;
  background: #314659;
  border-radius: 100vw;
  transition: all 0.3s;
  content: '';
}

.holder.leftChecked::before {
  left: 0;
}
</style>
