<template>
  <div class="box8">
    <p class="title">季度佣金进度</p>
    <div class="content">
      <div class="charts" ref="charts"></div>
      <div class="total_wrap">
        <div class="total_item_wrap">
          <a-tooltip :title="data.yongjin" placement="topLeft">
            <div class="total_item_number">{{ data.yongjin }}</div>
          </a-tooltip>
          <div class="total_item_label">
            <div class="section" style="background-color: #ed3f35"></div>
            <span>佣金</span>
          </div>
        </div>
        <div class="total_item_wrap">
          <a-tooltip :title="data.TBzengzhang" placement="topLeft">
            <div class="total_item_number">{{ data.TBzengzhang }}</div>
          </a-tooltip>
          <div class="total_item_label">
            <div class="section" style="background-color: #e5c022"></div>
            <span>同比增长</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

const data: { [key: string]: any } = ref({
  TBzengzhang: '1100.00%',
  yongjin: 1100.0,
  jindu: '37.09%',
})

//获取DOM节点
let charts = ref()
//组件挂载完毕
onMounted(() => {
  data.value.jindu = Number(data.value.jindu.split('%')[0])
  //一个容器可以同时展示多种类型的图形图标
  let mychart = echarts.init(charts.value)
  let option = {
    tooltip: {
      trigger: 'item',
    },
    title: {
      text: [`{a|${data.value.jindu}}`, '{b|%}'].join(''),
      x: 'center',
      top: '60%',
      textStyle: {
        color: '#fff',
        rich: {
          a: {
            fontSize: 25,
            fontWeight: 500,
            verticalAlign: 'bottom',
          },
          b: {
            fontSize: 16,
            verticalAlign: 'bottom',
          },
        },
      },
    },
    // visualMap: {
    //   show: false,
    //   min: 80,
    //   max: 600,
    //   inRange: {
    //     colorLightness: [0, 1]
    //   }
    // },
    grid: {
      top: '0%',
      left: '0%',
      right: '0%',
      bottom: '0%',
    },
    series: [
      {
        type: 'gauge',
        radius: '70',
        center: ['50%', '80%'],
        min: 0,
        max: 100,
        startAngle: 180,
        endAngle: 0,
        axisLine: {
          show: true,
          lineStyle: {
            // 轴线样式
            width: 10, // 宽度
            color: [
              [
                (data.value.jindu / 100).toFixed(2),
                new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0.3, color: '#00bcdc' },
                  { offset: 1, color: '#015ab4' },
                ]),
              ],
              [1, '#11264c'],
            ], // 颜色
          },
        },
        pointer: {
          // 仪表盘指针
          show: false,
        },
        axisTick: {
          // 刻度
          show: false,
        },
        splitLine: {
          // 分割线
          show: false,
        },
        axisLabel: {
          // 刻度标签
          show: false,
        },
        detail: {
          // 仪表盘详情
          show: false,
        },
      },
    ],
  }
  //设置配置项
  mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box8 {
  margin-top: 20px;

  .title {
    color: white;
    font-size: 18px;
  }

  .content {
    background-color: #11144e;
    margin-top: 10px;
    .charts {
      height: 122px;
    }

    .total_wrap {
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      padding: 20px;
      display: flex;
      align-items: center;
      .total_item_wrap {
        flex: 1;
        .total_item_number {
          font-size: 22px;
          font-weight: 450;
          color: white;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 90px;
          margin-bottom: 20px;
        }
        .total_item_label {
          display: flex;
          align-items: center;
          font-size: 16px;
          .section {
            margin-right: 10px;
            background-color: #69c99e;
            border-radius: 10px;
            width: 8px;
            height: 16px;
          }
          span {
            color: #3165c4;
          }
        }
      }
    }
  }
}
</style>
