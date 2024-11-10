<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ y: 'calc(100vh - 408px)' }"
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.VideoShowClass.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'qijinyong'">
          <a-popconfirm
            v-if="userStore.hasButton('Btn.VideoShowClass.Enable')"
            title="确定要修改吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handelQijinyong(row)"
          >
            <a-switch :checked="row.qijinyong === 1" />
          </a-popconfirm>
          <span v-else>
            {{ qijinyong.find((item) => item.value === row.qijinyong)?.label }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.VideoShowClass.Update'" @click="() => edit.show(row)">
            修改
          </a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定删除吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleDelete(row)"
          >
            <a v-has="'Btn.VideoShowClass.Delete'">删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a
            v-has="'Btn.VideoShowClass.Config'"
            @click="() => config.show(row)"
          >
            配置
          </a>
        </template>
      </template>
    </STable>

    <Add ref="add" :qijinyong="qijinyong" @success="table.refresh()" />
    <Edit ref="edit" @success="table.refresh()" />
    <Config ref="config" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import {
  reqSearch,
  reqEnable,
  reqDelete,
} from '@/api/VideoManager/VideoShowClass'
import { STable } from '@/components/STable'
import { message } from 'ant-design-vue'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import Config from './modules/Config.vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

const qijinyong = [
  {
    value: 1,
    label: '启用',
  },
  {
    value: 2,
    label: '禁用',
  },
]

const formItems = reactive([
  {
    type: 'input',
    label: '名称',
    field: 'mingcheng',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '启禁用',
    field: 'qijinyong',
    value: '',
    placeholder: '请输入',
    options: qijinyong,
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
])

const columns = [
  {
    title: '编码',
    dataIndex: 'bianma',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
  {
    title: '权重',
    dataIndex: 'quanzhong',
    align: 'center',
  },
  {
    title: '启禁用',
    dataIndex: 'qijinyong',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]

const table = ref()

const reqData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.field] = item.value
    }
  })

  const res: any = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

// 启禁用
const handelQijinyong = async (row: any) => {
  const result = await reqEnable({
    id: row.id,
    bianma: row.bianma,
    qijinyong: row.qijinyong === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    message.success(result.msg)
    table.value.refresh()
  } else {
    message.error(result.msg)
  }
}

// 删除
const handleDelete = async (row: any) => {
  const res = await reqDelete(row.id)
  if (res.code == 0) {
    message.success(res.msg)
    table.value.refresh()
  } else {
    message.error(res.msg)
  }
}

const add = ref()
const edit = ref()
const config = ref()
</script>

<style></style>
