<template>
  <div class="box4" ref="map">我是地图组件</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入中国地图的JSON数据
import chinaJSON from './china.json'
// 引入渲染航线和航点的数据
import data from './data.json'
import type { ScatterData, LineData } from './type'
import * as echarts from 'echarts/core'
import { MapChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components'
import { GeoComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册需要的组件
echarts.use([
  MapChart,
  GeoComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  CanvasRenderer,
])

//获取DOM元素
const map = ref()
// 航线数据
const lineData = ref<LineData>([])
// 航点数据
const scatterData = ref<ScatterData>([])

//注册中国地图
echarts.registerMap('china', chinaJSON as any)

onMounted(() => {
  initData()

  let mychart = echarts.init(map.value)
  //设置配置项
  mychart.setOption({
    title: {
      text: '近七天用户分布数据统计',
      textStyle: {
        fontSize: '20px',
        color: '#fff',
        fontWeight: 'normal',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        // console.log(params)
        if (params.seriesType === 'effectScatter') {
          return params.data.name + '' + (params.data.value[2] || 0)
        } else if (params.seriesType === 'lines') {
          return (
            params.data.fromName +
            '->' +
            params.data.toName +
            '<br />' +
            params.data.fromValue
          )
        } else {
          return params.data.name
        }
      },
    },
    geo: {
      map: 'china',
      // 开启鼠标平移和漫游
      roam: true,
      zoom: 2,
      top: '33%',
      bottom: '10px',
      itemStyle: {
        // 地图省份的背景颜色
        areaColor: '#01214a',
        borderColor: '#195BB9',
        borderWidth: 1,
      },
      emphasis: {
        itemStyle: {
          areaColor: '#2B91B7',
        },
        label: {
          show: true,
          color: '#fff',
        },
      },
      /* // 标签
          label: {
            emphasis: {
              show: true,
              color: '#fff'
            }
          },
          //   地区样式
          itemStyle: {
            borderColor: '#4f94e6',
            borderWidth: 1,
            // 径向渐变
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#1c396c' // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: '#11285c' // 0% 处的颜色
                }
              ],
              global: false // 缺省为 false
            },
            normal: {
              // 地图省份的背景颜色
              areaColor: '#01214a',
              borderColor: '#195BB9',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          // 高亮状态 样式
          emphasis: {
            itemStyle: {
              color: '#5470c6'
            },
            label: {
              show: true,
              // fontSize: '30px',
              color: '#fff'
            }
          } */
    },
    // grid: {
    //   top: '30%'
    // },
    //   路线图
    series: [
      // 航线
      {
        type: 'lines',
        data: lineData.value,
        effect: {
          show: true,
          // 图标
          symbol: 'circle',
          // 图标大小
          symbolSize: 4,
          color: 'white',
          // 尾迹长度 0-1
          trailLength: 0.02,
          // 动画时长
          period: 2,
        },
      },
      // 发光散点
      {
        colorBy: 'data',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: function (val: any) {
          return val[2] / 15
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
        },
        emphasis: {
          scale: true,
        },
        label: {
          // show: true

          formatter: '{b}',
          position: 'right',
          show: true,
        },
        itemStyle: {
          /* normal: {
                color: 'rgba(255,255,0,0.8)',
                shadowBlur: 10,
                shadowColor: '#05C3F9'
              } */
        },
        zlevel: 1,
        data: scatterData.value,
      },
    ],
  })
})

const initData = () => {
  scatterData.value = data.object.scatterData
  data.object.lineData.forEach((i) => {
    if (i.coords.js) {
      const item = {
        coords: [i.coords.ks.slice(0, 2), i.coords.js.slice(0, 2)],
        lineStyle: {
          curveness: 0.2, // 曲度
          // 航线宽度
          width: 0.3,
        },
        fromName: i.coords.ksmc,
        toName: i.coords.jsmc,
        fromValue: i.coords.js[2],
      }
      lineData.value.push(item)
    }
  })
  //   console.log('$$$', lineData.value)
}
</script>

<style scoped>
.box4 {
  width: 100%;
  height: 665px;
}
</style>
