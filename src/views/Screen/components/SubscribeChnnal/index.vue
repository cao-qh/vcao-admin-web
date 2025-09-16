<template>
  <div class="box7">
    <p class="title">预约渠道数据统计</p>
    <div class="content">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
//获取DOM节点
let charts = ref()

const data = ref<{ [key: string]: number }[]>([
  {
    pt: 1,
    sl: 67,
  },
  {
    pt: 4,
    sl: 20,
  },
  {
    pt: 3,
    sl: 1,
  },
])

const pingtaiList: { [key: number]: string } = {
  1: '天猫',
  2: '京东',
  3: '拼多多',
  4: '抖音',
  5: '快手',
  6: '头条',
  7: '其他',
}

//组件挂载完毕
onMounted(() => {
  data.value = data.value.map((i): any => {
    return {
      value: i.sl,
      name: pingtaiList[i.pt],
    }
  })

  //一个容器可以同时展示多种类型的图形图标
  let mychart = echarts.init(charts.value)
  //设置配置项
  mychart.setOption({
    tooltip: {
      trigger: 'item',
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
        // name: 'Access From',
        type: 'pie',
        radius: '100%',
        data: data.value.sort(function (a: any, b: any) {
          return a.value - b.value
        }),
        // roseType: 'radius',
        label: {
          position: 'inside',
          color: 'white',
          fontSize: '12px',
          rotate: true,
        },
        labelLine: {
          lineStyle: {
            color: 'white',
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          // color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function () {
          return Math.random() * 200
        },
      },
    ],
  })
})
</script>

<style scoped>
.box7 {
  margin-top: 20px;

  .title {
    color: white;
    font-size: 18px;
  }

  .content {
    background-color: #11144e;
    margin-top: 10px;
    padding: 20px 30px;
    .charts {
      height: 178px;
    }
  }
}
</style>
