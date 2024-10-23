<template>
  <PageWrapper>
    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ y: 'calc(100vh - 450px)' }"
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.VideoUnlock.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.VideoUnlock.Update'" @click="() => edit.show(row)">
            修改
          </a>
        </template>
      </template>
    </STable>

    <Add ref="add" :lockType="lockType" @success="table.refresh()" />

    <Edit ref="edit" :lockType="lockType" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/table/search/index'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'

// 锁方式
const lockType = [
  {
    label: '视频',
    value: 1,
  },
  {
    label: '广告',
    value: 2,
  },
]

const columns = [
  {
    title: '锁方式',
    dataIndex: 'sfs',
    align: 'center',
  },
  {
    title: '广告',
    dataIndex: 'gg',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '100px',
    align: 'center',
  },
]

const reqData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }

  const res: any = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

const table = ref()
// 添加记录
const add = ref()
// 修改
const edit = ref()
</script>

<style></style>
