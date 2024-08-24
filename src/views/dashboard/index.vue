<template>
  <div style="padding: 10px">
    <!-- 数量统计 -->
    <CountStatistics />
    <a-row :gutter="10">
      <a-col :xs="24" :sm="17">
        <!-- 折线图-年度销售 -->
        <YearlySales />
      </a-col>
      <a-col :xs="24" :sm="7">
        <!-- 饼图-激活量 -->
        <ActiveStatistics />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import CountStatistics from './components/CountStatistics/index.vue'
import YearlySales from './components/YearlySales/index.vue'
import ActiveStatistics from './components/ActiveStatistics/index.vue'
</script>

<style></style>
