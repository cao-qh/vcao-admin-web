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
          v-has="'Btn.AdScore.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.AdScore.Update'" @click="() => edit.show(row)">修改</a>
          <a-divider type="vertical"></a-divider>
          <a-popconfirm
            title="确定删除吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleDelete(row)"
          >
            <a v-has="'Btn.AdScore.Delete'">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </STable>

    <Add ref="add" :scoreType="scoreType" @success="table.refresh()" />

    <Edit ref="edit" :scoreType="scoreType" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { STable } from '@/components/STable'
import { reqSearch, reqSubmit } from '@/api/table/search/index'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'

// 积分类型
const scoreType = [
  {
    label: '固定',
    value: 1,
  },
  {
    label: '区间',
    value: 2,
  },
]

const columns = [
  {
    title: '积分类型',
    dataIndex: 'jflx',
    align: 'center',
    customRender: ({ text }: any) =>
      scoreType.find((item) => item.value == text)?.label,
  },
  {
    title: '积分',
    dataIndex: 'jf',
    align: 'center',
  },
  {
    title: '最低积分',
    dataIndex: 'zdjf',
    align: 'center',
  },
  {
    title: '最高积分',
    dataIndex: 'qj',
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
    width: '150px',
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

const handleDelete = async (row: any) => {
  const res = await reqSubmit(row.id)
  if (res.code == 0) {
    message.success(res.msg)
  } else {
    message.error(res.msg)
  }
}

const table = ref()
// 添加记录
const add = ref()
// 修改
const edit = ref()
</script>

<style></style>
