<template>
  <div class="container">
    <div class="screen" ref="screen">
      <Top />
      <div class="bottom">
        <div class="left">
          <CountStatistics />
          <FailDetails />
          <AgentArea />
        </div>
        <div class="center">
          <Map></Map>
          <CustomerTotal />
        </div>
        <div class="right">
          <Brokerage />
          <!-- <Year class="year" />
          <Counter class="count" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from './components/Top/index.vue'
import CountStatistics from './components/CountStatistics/index.vue'
import FailDetails from './components/FailDetails/index.vue'
import AgentArea from './components/AgentArea/index.vue'
import Map from './components/Map/index.vue'
import CustomerTotal from './components/CustomerTotal/index.vue'

//引入右侧三个子组件
import Brokerage from './components/Brokerage/index.vue'
import Year from './components/Year/index.vue'
import Counter from './components/Couter/index.vue'

defineOptions({ name: 'Screen' })
const screen = ref()

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

// 定义打拼缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
</script>

<style scoped lang="scss">
.container {
  user-select: none;
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      padding: 0 20px;
      .right {
        flex: 1;
        // background-color: aqua;
      }
      .left {
        flex: 1;
      }
      .center {
        flex: 2.1;
        // background-color: orange;
        margin: 40px 10px 0px 10px;
      }
    }
  }
}
</style>
