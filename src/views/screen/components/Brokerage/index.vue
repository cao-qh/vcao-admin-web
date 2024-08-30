<template>
  <div class="box6">
    <div class="title">
      <div class="left">
        <p>佣金统计</p>
        <img src="../../images/dataScreen-title.png" alt="" />
      </div>
      <div class="right">
        <div class="label_wrap">
          <div
            class="label_item"
            v-for="(value, key) in limit.labelArr"
            :key="key"
            :class="{ selected: limit.selected === key }"
            @click="
              () => {
                limit.selected = key
                // init()
              }
            "
          >
            {{ value }}
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 图形图标的容器 -->
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import data from './data.json'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册需要的组件
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
])

const limit = reactive({
  labelArr: { '1': '年', '2': '近半年', '3': '月', '4': '周' },
  selected: '4',
})

//获取DOM节点
let charts = ref()
//组件挂载完毕
onMounted(() => {
  init()
})

const init = () => {
  const mychart = echarts.init(charts.value)
  mychart.setOption({
    legend: {
      data: ['实际佣金', '预估佣金'],
      textStyle: {
        color: '#2e6bc0',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      data: data.time,
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        color: '#2e6bc0',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#2e6bc0',
      },
      name: '单位:元',
      nameTextStyle: {
        color: '#2e6bc0',
      },
    },
    grid: {
      top: '40px',
      left: '30px',
      right: '10px',
      bottom: '20px',
    },

    series: [
      {
        name: '实际佣金',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: data.shijifanyong,
        lineStyle: {
          color: '#16e9e9',
        },
      },
      {
        name: '预估佣金',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: data.yujifanyong,
        lineStyle: {
          color: '#e3322f',
        },
      },
    ],
  })
}
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100%;
  margin-top: 10px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      p {
        color: white;
        font-size: 20px;
      }

      img {
        margin-top: 15px;
      }
    }

    .right {
      margin-right: 15px;
      width: 200px;
      .label_wrap {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .label_item {
          height: 25px;
          // width: 25px;
          font-size: 16px;
          color: #2e6bc0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          cursor: pointer;
          padding: 0 5px;
        }
        .selected {
          background-color: #0084d7;
          color: white;
        }
      }
    }
  }

  .content {
    box-sizing: border-box;
    padding: 30px 20px;
    background-color: #11144e;
    .charts {
      height: 300px;
      // background-color: #0084d7;
    }
  }
}
</style>
