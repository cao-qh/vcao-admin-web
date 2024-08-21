<template>
  <div class="login-container">
    <div class="main">
      <h1>vcao admin</h1>
      <h2>持续完善中</h2>

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
import { computed } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import Form from './components/Form/index.vue'

const layoutSettingStore = useLayoutSettingStore()
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
  width: 100%;
  height: 100vh;
  background: v-bind('bgColor');
  padding: 10% 0;

  .main {
    width: 375px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px;

    h1 {
      font-size: 25px;
      padding: 10px 0;
      text-align: center;
    }
    h2 {
      font-size: 15px;
      padding: 0 0 10px 0;
      text-align: center;
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
