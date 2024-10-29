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
          v-has="'Btn.HomeSetting.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.HomeSetting.Update'" @click="() => edit.show(row)">
            修改
          </a>
          <a-divider type="vertical"></a-divider>
          <a-popconfirm
            title="确定删除吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleDelete(row)"
          >
            <a v-has="'Btn.HomeSetting.Delete'">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </STable>

    <Add ref="add" @success="table.refresh()" />

    <Edit ref="edit" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { STable } from '@/components/STable'
import { reqSearch, reqSubmit } from '@/api/table/search/index'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '第几天',
    dataIndex: 'djt',
    align: 'center',
  },
  {
    title: '第几天积分',
    dataIndex: 'djtjf',
    align: 'center',
  },
  {
    title: '连续签到天数',
    dataIndex: 'lxqdts',
    align: 'center',
  },
  {
    title: '连续签到递增积分',
    dataIndex: 'lxqdzjjf',
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
