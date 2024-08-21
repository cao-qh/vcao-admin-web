<template>
  <div id="tsparticles" class="login-container">
    <ParticleBackground />

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
import Form from './components/Form/index.vue'
import ParticleBackground from './components/ParticleBackground/index.vue'
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  height: 100vh;

  .main {
    user-select: none;
    position: absolute;
    width: 375px;
    box-sizing: border-box;
    padding: 20px;
    z-index: 1;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);

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
    z-index: 100;
  }
}
</style>
