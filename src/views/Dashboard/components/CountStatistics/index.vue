<template>
  <a-row :gutter="10">
    <a-col :xs="24" :sm="6" v-for="item in statistics" :key="item.id">
      <a-card size="small">
        <template #title>
          <span style="font-weight: normal">{{ item.titile }}</span>
        </template>
        <template #extra>
          <span :style="item.extraStyle">{{ item.extra }}</span>
        </template>
        <div>
          <a-statistic :value="item.number" />
          <a-flex justify="space-between">
            <span>{{ item.totalTitle }}</span>
            <div>
              <span>{{ item.totalNumber }}</span>
              <component :is="item.totalIcon" style="margin: 5px" />
            </div>
          </a-flex>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 数据统计数据
const statistics = ref([
  {
    id: 1,
    titile: '审核中',
    number: '6321',
    extra: '日',
    extraStyle: {
      backgroundColor: '#1E9FFF',
      color: 'white',
      padding: '0 5px',
      borderRadius: '3px',
    },
    totalTitle: '总审核量',
    totalNumber: '3万',
    totalIcon: 'FlagOutlined',
  },
  {
    id: 2,
    titile: '已提交',
    number: '389688',
    extra: '周',
    extraStyle: {
      backgroundColor: 'black',
      color: 'white',
      padding: '0 5px',
      borderRadius: '3px',
    },
    totalTitle: '总提交量',
    totalNumber: '20万',
    totalIcon: 'CrownOutlined',
  },
  {
    id: 3,
    titile: '已发货',
    number: '785652',
    extra: '月',
    extraStyle: {
      backgroundColor: '#16BAAA',
      color: 'white',
      padding: '0 5px',
      borderRadius: '3px',
    },
    totalTitle: '总发货量',
    totalNumber: '***',
    totalIcon: 'CarOutlined',
  },
  {
    id: 4,
    titile: '已退款',
    number: '11123',
    extra: '年',
    extraStyle: {
      backgroundColor: 'orange',
      color: 'white',
      padding: '0 5px',
      borderRadius: '3px',
    },
    totalTitle: '总退款量',
    totalNumber: '10%',
    totalIcon: 'MehOutlined',
  },
])
</script>

<style></style>
