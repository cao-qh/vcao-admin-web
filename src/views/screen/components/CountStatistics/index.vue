<template>
  <div class="box">
    <div class="top">
      <p class="title">2024订单数据统计</p>
      <p class="bg"></p>
    </div>
    <a-flex class="bottom" justify="space-around">
      <a-flex class="item" vertical v-for="item in data" :key="item.id">
        <span class="number">{{ item.number }}</span>
        <div>
          <span class="tag" :style="{ background: item.tagColor }"></span>
          <span class="title">{{ item.title }}</span>
        </div>
      </a-flex>
    </a-flex>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  {
    id: 1,
    title: '订单总数',
    number: 63,
    tagColor: '#69C99E',
  },
  {
    id: 2,
    title: '产品总数',
    number: 14,
    tagColor: '#69C99E',
  },
  {
    id: 3,
    title: '代理总数',
    number: 11,
    tagColor: '#ED3F35',
  },
])
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100%;
  margin-top: 10px;
  .top {
    .title {
      color: #fff;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      margin-top: 15px;
    }
  }
  .bottom {
    padding: 45px 0;

    .item {
      .number {
        color: #fff;
        font-size: 36px;
        margin-bottom: 15px;
      }
      .tag {
        display: inline-block;
        width: 8px;
        height: 16px;
        border-radius: 5px;
        margin-right: 10px;
      }
      .title {
        color: #3165c4;
        font-size: 20px;
      }
    }
  }
}
</style>
