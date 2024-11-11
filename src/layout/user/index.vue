<template>
  <div id="tsparticles" class="login-container">
    <ParticleBackground />

    <div class="header">
      <!-- 切换暗黑模式 -->
      <SunMoon v-model="layoutSettingStore.dark" />
    </div>

    <div class="main">
      <RouterView />
    </div>

    <div class="footer">
      <a-typography-text style="opacity: 0.6">
        © 焦作市云启航网络科技有限公司
      </a-typography-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import ParticleBackground from './components/ParticleBackground/index.vue'
import SunMoon from '@/components/SunMoon/index.vue'
import useLayoutSettingStore from '@/store/modules/setting'
import { computed } from 'vue'

const layoutSettingStore = useLayoutSettingStore()

// 获取主页背景颜色
const bgColor = computed(() => {
  if (layoutSettingStore.dark) {
    return 'linear-gradient(0deg,#000000,#434343)'
  } else {
    return 'linear-gradient(0deg,#8e9eab,#eef2f3)'
  }
})
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  height: 100vh;
  background: v-bind('bgColor');

  .header {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 100;
  }

  .main {
    user-select: none;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    z-index: 1;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    z-index: 100;
  }
}
</style>
