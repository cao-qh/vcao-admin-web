<template>
  <div class="login-container">
    <canvas class="particle-background"></canvas>

    <div class="main">
      <a-typography-text class="h1">vcao admin</a-typography-text>
      <a-typography-text class="h2">持续完善中</a-typography-text>

      <Form></Form>
    </div>

    <div class="footer">
      <a-typography-text style="opacity: 0.6">
        © All Rights Reserved
      </a-typography-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import Form from './components/Form/index.vue'
import particles from 'particlesjs'

const layoutSettingStore = useLayoutSettingStore()
const particleInstance = ref<any>(null)

onMounted(() => {
  particleInstance.value = particles.init({
    selector: '.particle-background',
    color: '#c92a2a',
    connectParticles: true,
    maxParticles: 150,
  })
})

onBeforeUnmount(() => {
  particleInstance.value?.destroy()
})

// 获取主页背景颜色
const bgColor = computed(() => {
  if (layoutSettingStore.dark) {
    return '#000000'
  } else {
    return '#f2f2f2'
  }
})
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  height: 100vh;
  background: v-bind('bgColor');
  padding: 15% 0;

  .particle-background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }

  .main {
    width: 375px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px;

    .h1 {
      font-size: 25px;
      padding: 10px 0;
      text-align: center;
      display: block;
    }
    .h2 {
      font-size: 15px;
      padding: 0 0 10px 0;
      text-align: center;
      display: block;
    }
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: 30px;
    padding: 20px;
    text-align: center;
    box-sizing: border-box;
    font-size: 14px;
  }
}
</style>
