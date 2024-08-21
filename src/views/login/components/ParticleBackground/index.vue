<template>
  <vue-particles id="tsparticles" :options="particleOptions" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()

// 获取主页背景颜色
const bgColor = computed(() => {
  if (layoutSettingStore.dark) {
    return '#000000'
  } else {
    return '#f2f2f2'
  }
})

const particleOptions = ref({
  background: {
    color: {
      value: bgColor,
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: layoutSettingStore.themeColor,
    },
    links: {
      color: layoutSettingStore.themeColor,
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: 'bounce',
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
})
</script>

<style></style>
