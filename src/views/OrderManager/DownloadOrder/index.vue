<template>
  <PageWrapper>
    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :scroll="{ y: 'calc(100vh - 408px)' }"
    >
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'status'">
          <span
            :style="{
              color: getStatus(row.status).color,
            }"
          >
            {{ getStatus(row.status).label }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a @click="handleDownload(row)">下载</a>
        </template>
      </template>
    </STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/OrderManager/DownloadOrder'
import { linkDownload } from '@/utils/download'

const baseUrl = import.meta.env.VITE_SERVE

// 1导出中 2导出成功 3导出失败
const status = [
  {
    value: 1,
    label: '导出中',
    color: 'blue',
  },
  {
    value: 2,
    label: '导出成功',
    color: 'green',
  },
  {
    value: 3,
    label: '导出失败',
    color: 'red',
  },
]

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '文件名',
    dataIndex: 'file',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'dateTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]

let timer: any = null

onMounted(() => {
  timer = setInterval(() => {
    reqData()
  }, 10000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const reqData = async () => {
  const res: any = await reqSearch()
  if (res.code == 0) {
    return {
      data: res.data,
      total: res.data.length,
    }
  }
}

const handleDownload = (row: any) => {
  linkDownload(baseUrl + '/duanjufile/xiazaidingdang/' + row.file)
}

// 获取订单状态
const getStatus = (value: number) => {
  const item: any = status.find((item: any) => item.value === value)
  return item
}
</script>

<style></style>
