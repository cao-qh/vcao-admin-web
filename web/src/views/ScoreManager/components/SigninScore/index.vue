<template>
  <div>
    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ y: 'calc(100vh - 340px)' }"
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.SigninScore.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.SigninScore.Update'" @click="() => edit.show(row)">
            修改
          </a>
          <a-divider type="vertical"></a-divider>
          <a-popconfirm
            title="确定删除吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleDelete(row)"
          >
            <a v-has="'Btn.SigninScore.Delete'">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </STable>

    <Add ref="add" @success="table.refresh()" />

    <Edit ref="edit" @success="table.refresh()" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { STable } from '@/components/STable'
import { reqSearch, reqDelete } from '@/api/ScoreManager/SigninScore'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '第几天',
    dataIndex: 'dijitian',
    align: 'center',
  },
  {
    title: '第几天积分',
    dataIndex: 'dijitainjifen',
    align: 'center',
  },
  {
    title: '连续签到天数',
    dataIndex: 'lainxuqiandaotianshu',
    align: 'center',
  },
  {
    title: '连续签到递增积分',
    dataIndex: 'lianxuqiaodaodizengjifen',
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
      total: res.data.totalSize,
    }
  }
}

const handleDelete = async (row: any) => {
  const res = await reqDelete(row.id)
  if (res.code == 0) {
    message.success(res.msg)
    table.value.refresh()
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
