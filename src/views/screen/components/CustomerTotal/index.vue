<template>
  <div class="box5">
    <div class="title">
      <p>全国客户总量统计</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="content">
      <div class="left">
        <div class="bar" ref="bar"></div>
      </div>
      <div class="right">
        <div class="right-item">
          <span class="number">88</span>
          <div class="desc">
            <div style="background-color: #ed3f35"></div>
            <span>代理总数</span>
          </div>
        </div>
        <div style="height: 40px"></div>
        <div class="right-item">
          <span class="number">52</span>
          <div class="desc">
            <div style="background-color: #e5c022"></div>
            <span>本月新增</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import data from './data.json'

//获取图形图标的节点
let bar = ref()
onMounted(() => {
  let mycharts = echarts.init(bar.value)
  //设置配置项
  mycharts.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#045ab7',
        },
      },
    },
    legend: {
      // data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
      show: false,
    },
    // 不显示下载按钮
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      data: data.chartData.name,
      axisLabel: {
        inside: true,
        color: '#fff',
        // 旋转角度
        rotate: 0,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#999',
      },
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    series: [
      {
        type: 'bar',
        showBackground: false,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00fbf9' },
            { offset: 0.5, color: '#045ab7' },
            { offset: 1, color: '#045ab7' },
          ]),
        },
        // emphasis: {
        //   itemStyle: {
        //     color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       { offset: 0, color: '#00fbf9' },
        //       { offset: 0.7, color: '#045ab7' },
        //       { offset: 1, color: '#045ab7' }
        //     ])
        //   }
        // },
        data: data.chartData.value,
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box5 {
  width: 100%;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100%;
  margin-top: 20px;

  .title {
    margin-left: 10px;

    p {
      color: white;
      font-size: 20px;
    }

    img {
      margin-top: 15px;
    }
  }

  .content {
    margin-top: 10px;
    display: flex;
    background-color: #11144e;

    .left {
      flex: 5;
      padding: 0 0 18px 10px;
      .bar {
        width: 100%;
        height: 250px;
        // background-color: red;
      }
    }

    .right {
      position: relative;
      flex: 1;
      background-color: #182965;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 35px 0;
      margin: 0 20px 10px 10px;
      // background-color: red;

      &::before {
        content: '';
        position: absolute;
        top: -1px;
        right: -1px;
        border-bottom: 20px solid transparent;
        border-right: 20px solid #11144e;
        z-index: 1;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: -1px;
        border-top: 20px solid transparent;
        border-left: 20px solid #11144e;
        z-index: 1;
      }

      .right-item {
        display: flex;
        flex-direction: column;

        .number {
          color: white;
          font-size: 32px;
          margin-bottom: 15px;
        }

        .desc {
          color: #3165c4;
          display: flex;
          align-items: center;
          > div {
            width: 8px;
            height: 15px;
            border-radius: 5px;
            margin-right: 5px;
          }
          > span {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
