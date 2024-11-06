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
          v-has="'Btn.VideoSmallClass.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'qijinyong'">
          <a-popconfirm
            v-if="userStore.hasPermission('Swh.VideoSmallClass.Enable')"
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
          <a v-has="'Btn.VideoSmallClass.Update'" @click="() => edit.show(row)">
            修改
          </a>
        </template>
      </template>
    </STable>

    <Add
      ref="add"
      :qijinyong="qijinyong"
      :largeClassList="largeClassList"
      @success="table.refresh()"
    />

    <Edit
      ref="edit"
      :largeClassList="largeClassList"
      @success="table.refresh()"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { reqSearch, reqEnable } from '@/api/VideoManager/VideoSmallClass'
import { STable } from '@/components/STable'
import { message } from 'ant-design-vue'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import useUserStore from '@/store/modules/user'
import { reqLargeClass } from '@/api/common'

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

// 视频大类列表
const largeClassList = ref([])

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
  {
    type: 'select',
    label: '大类',
    field: 'shangjiBianma',
    value: '',
    placeholder: '请输入',
    options: async () => {
      const res = await reqLargeClass()
      largeClassList.value = res.data.map((item: any) => ({
        value: item.bm,
        label: item.mc,
      }))
      return largeClassList.value
    },
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
    title: '权重(%)',
    dataIndex: 'quanzhong',
    align: 'center',
  },
  {
    title: '上级编码',
    dataIndex: 'shangjiBianma',
    align: 'center',
  },
  {
    title: '上级名称',
    dataIndex: 'shangjiBianmaMC',
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

const add = ref()
const edit = ref()
</script>

<style></style>
