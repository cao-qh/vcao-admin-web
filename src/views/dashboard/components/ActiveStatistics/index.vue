<template>
  <a-card style="margin-top: 10px" size="small">
    <template #title>
      <span style="font-weight: normal">号卡激活状态</span>
    </template>
    <div ref="pie" style="height: 390px"></div>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 20px;
        height: 110px;
        padding: 0 30px 20px 30px;
      "
    >
      <div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
        >
          <span>已激活</span>
          <span>{{ pieOption.series[0].data[0].value }}</span>
        </div>
        <div
          :style="{
            height: '5px',
            'background-color': pieOption.series[0].data[0].value
              ? 'blue'
              : 'gray',
          }"
        ></div>
      </div>
      <div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
        >
          <span>未激活</span>
          <span>{{ pieOption.series[0].data[1].value }}</span>
        </div>
        <div
          :style="{
            height: '5px',
            'background-color': pieOption.series[0].data[1].value
              ? 'blue'
              : 'gray',
          }"
        ></div>
      </div>
      <div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
        >
          <span>开卡失败</span>
          <span>{{ pieOption.series[0].data[2].value }}</span>
        </div>
        <div
          :style="{
            height: '5px',
            'background-color': pieOption.series[0].data[2].value
              ? 'blue'
              : 'gray',
          }"
        ></div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

// 饼图-激活量
const pieOption = reactive({
  legend: {
    left: 'center',
    bottom: 0,
    itemWidth: 15,
    itemHeight: 15,
    icon: 'circle',
  },
  series: [
    {
      name: '激活状态',
      type: 'pie',
      emphasis: {
        scale: false,
      },
      radius: ['50%', '80%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: {},
      label: {
        show: true,
        position: 'inside',
        color: '#fff',
        formatter: (params: any) => {
          if (params.value <= 0) {
            return ''
          }
          const val = Math.floor((params.value / params.data.total) * 100)
          // console.log('val :>> ', val)
          return `${val}%`
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: 10,
          total: 48,
          name: '已激活',
          itemStyle: { color: '#389e0d' },
        },
        {
          value: 16,
          total: 48,
          name: '未激活',
          itemStyle: { color: '#faad14' },
        },
        {
          value: 22,
          total: 48,
          name: '开卡失败',
          itemStyle: { color: '#d4380d' },
        },
      ],
    },
  ],
})
const pie = ref()

onMounted(() => {
  let myChart = echarts.init(pie.value)
  myChart.setOption(pieOption)
})
</script>

<style></style>
