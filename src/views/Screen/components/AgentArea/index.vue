<template>
  <div class="box2">
    <div class="title">
      <p>代理地区分布统计</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="content">
      <div class="left">
        <div class="pie" ref="pie"></div>
      </div>

      <div class="right">
        <div class="right-item">
          <span class="number">18</span>
          <div class="desc">
            <div style="background-color: #ed3f35"></div>
            <span>代理总数</span>
          </div>
        </div>
        <div style="height: 40px"></div>
        <div class="right-item">
          <span class="number">18</span>
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
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册需要的组件
echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
])

const data = reactive({
  pie: {
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '0%',
      left: '0%',
    },
    series: [
      {
        type: 'pie',
        radius: ['5%', '50%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          color: 'white',
        },
        labelLine: {
          smooth: 0.2,
          length: 5,
          length2: 20,
        },
        data: [
          {
            value: 0,
            name: '北京市',
          },
          {
            value: 0,
            name: '天津市',
          },
          {
            value: 0,
            name: '上海市',
          },
          {
            value: 0,
            name: '重庆市',
          },
          {
            value: 0,
            name: '河北省',
          },
          {
            value: 0,
            name: '山西省',
          },
          {
            value: 0,
            name: '辽宁省',
          },
          {
            value: 0,
            name: '吉林省',
          },
          {
            value: 0,
            name: '黑龙江省',
          },
          {
            value: 0,
            name: '江苏省',
          },
          {
            value: 0,
            name: '浙江省',
          },
          {
            value: 0,
            name: '安徽省',
          },
          {
            value: 0,
            name: '福建省',
          },
          {
            value: 0,
            name: '江西省',
          },
          {
            value: 0,
            name: '山东省',
          },
          {
            value: 1,
            name: '河南省',
          },
          {
            value: 1,
            name: '湖北省',
          },
          {
            value: 0,
            name: '湖南省',
          },
          {
            value: 0,
            name: '广东省',
          },
          {
            value: 0,
            name: '海南省',
          },
          {
            value: 0,
            name: '四川省',
          },
          {
            value: 0,
            name: '贵州省',
          },
          {
            value: 0,
            name: '云南省',
          },
          {
            value: 0,
            name: '陕西省',
          },
          {
            value: 0,
            name: '甘肃省',
          },
          {
            value: 0,
            name: '青海省',
          },
          {
            value: 0,
            name: '台湾省',
          },
          {
            value: 0,
            name: '内蒙古自治区',
          },
          {
            value: 0,
            name: '广西壮族自治区',
          },
          {
            value: 0,
            name: '西藏自治区',
          },
          {
            value: 0,
            name: '宁夏回族自治区',
          },
          {
            value: 0,
            name: '新疆维吾尔自治区',
          },
        ],
        roseType: 'radius',
      },
    ],
  },
  statistic: {
    agentTotal: 12,
    monthAdd: 12,
  },
})

const pie = ref()

const initPie = () => {
  const mychart = echarts.init(pie.value)
  mychart.setOption(data.pie)
}

onMounted(() => {
  initPie()
})
</script>

<style scoped>
.box2 {
  width: 100%;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100%;
  margin-top: 20px;

  .title {
    p {
      color: white;
      font-size: 20px;
    }
    img {
      margin-top: 15px;
    }
  }

  .content {
    margin-top: 12px;
    display: flex;

    .left {
      flex: 1.8;
      height: 100%;

      .pie {
        width: 100%;
        height: 260px;
      }
    }

    .right::before {
      content: '';
      position: absolute;
      top: -1px;
      right: -1px;
      border-bottom: 20px solid transparent;
      border-right: 20px solid #11144e;
      z-index: 1;
    }

    .right::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: -1px;
      border-top: 20px solid transparent;
      border-left: 20px solid #11144e;
      z-index: 1;
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
      margin: 0 20px 20px 10px;

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
