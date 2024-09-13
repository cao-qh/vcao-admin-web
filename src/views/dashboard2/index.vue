<template>
  <div style="padding: 10px">
    <a-row :gutter="10">
      <a-col :xs="24" :sm="18">
        <a-row :gutter="[10, 10]">
          <a-col :xs="24" :sm="8">
            <!-- 年度总收益 -->
            <YearTotalIncome />
          </a-col>
          <a-col :xs="24" :sm="16">
            <!-- 代理和订单 -->
            <AgentAndOrder />
          </a-col>
        </a-row>
        <!-- 折线图-佣金收入 -->
        <Income />
      </a-col>
      <a-col :xs="24" :sm="6">
        <!-- 代理和订单 -->
        <Notification />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import YearTotalIncome from './components/YearTotalIncome/index.vue'
import AgentAndOrder from './components/AgentAndOrder/index.vue'
import Notification from './components/Notification/index.vue'
import Income from './components/Income/index.vue'
</script>

<style></style>
