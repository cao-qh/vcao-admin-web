<template>
  <div class="login-container">
    <ParticleBackground />

    <div class="header">
      <!-- 切换暗黑模式 -->
      <SunMoon v-model="layoutSettingStore.dark" />
    </div>

    <div class="main">
      <RouterView />

      <div class="copyright">
        <a-typography-text>
          © 郑州兴投信息技术有限公司 -2024
          <a
            href="https://beian.miit.gov.cn/#/Integrated/index"
            target="_blank"
          >
            豫ICP备2024092740号
          </a>
        </a-typography-text>
      </div>
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

<style scoped>
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

  .copyright {
    text-align: center;
    width: 375px;
    margin: 0 auto;
  }
}
</style>
