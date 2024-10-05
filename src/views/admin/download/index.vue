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
        <template v-if="column.dataIndex === 'action'">
          <a @click="handleDownload(row)">下载</a>
        </template>
      </template>
    </STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { STable } from '@/components/STable'
import { reqSearchExport, reqDownload } from '@/api/common'

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
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]

const reqData = async () => {
  const res: any = await reqSearchExport()
  if (res.code == 0) {
    return {
      data: res.data,
      total: res.data.length,
    }
  }
}

const handleDownload = (row: any) => {
  reqDownload(row.file)
}
</script>

<style></style>
