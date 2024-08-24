<template>
  <!-- 折线图-年度销售 -->
  <a-card style="margin-top: 10px" size="small">
    <template #title>
      <span style="font-weight: normal">年度销售（单位：万）</span>
    </template>
    <template #extra>
      <a-radio-group v-model:value="yearlySales.limit" size="small">
        <a-radio-button :value="1">全部</a-radio-button>
        <a-radio-button :value="2">近半年</a-radio-button>
        <a-radio-button :value="3">近一个月</a-radio-button>
        <a-radio-button :value="4">近一周</a-radio-button>
      </a-radio-group>
    </template>
    <div ref="yearlySalesLine" style="height: 520px"></div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

// 年度销售数据
const yearlySales = reactive({
  limit: 1,
  lineOption: {
    xAxis: {
      type: 'category',
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [
          112, 356, 901, 934, 1290, 1380, 1320, 1320, 1800, 2200, 1999, 1765,
        ],
        type: 'line',
        smooth: true,
      },
    ],
  },
})
const yearlySalesLine = ref()

onMounted(() => {
  let myChart = echarts.init(yearlySalesLine.value)
  myChart.setOption(yearlySales.lineOption)
})
</script>

<style></style>
