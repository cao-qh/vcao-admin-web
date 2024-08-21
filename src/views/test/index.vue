<template>
  <PageWrapper class="box1">
    <vue-particles id="tsparticles" :options="particleOptions" />
    <div>ddd</div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

onMounted(() => {})

const particleOptions = ref({
  // fpsLimit: 120,
  fullScreen: false,

  particles: {
    color: {
      value: '#c92a2a',
    },
    links: {
      color: '#c92a2a',
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
})
</script>
