<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

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

    <Add
      ref="add"
      :position="position"
      :jumpType="jumpType"
      @success="table.refresh()"
    />

    <Edit
      ref="edit"
      :position="position"
      :jumpType="jumpType"
      @success="table.refresh()"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/AppConfig/HomeSetting'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'

// 位置
const position: any = [
  {
    value: 1,
    label: '首页',
  },
  {
    value: 2,
    label: '追剧页',
  },
]

// 跳转类型
const jumpType: any = [
  {
    value: 1,
    label: '短剧',
  },
  {
    value: 2,
    label: '广告',
  },
]

const formItems = reactive([
  {
    type: 'select',
    label: '位置',
    filed: 'position',
    value: '',
    placeholder: '请输入',
    options: position,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
  {
    type: 'select',
    label: '跳转类型',
    filed: 'jumpType',
    value: '',
    placeholder: '请选择',
    options: jumpType,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
])

const columns = [
  {
    title: '图片',
    dataIndex: 'tp',
    align: 'center',
  },
  {
    title: '权重',
    dataIndex: 'qz',
    align: 'center',
  },
  {
    title: '跳转类型',
    dataIndex: 'tzlx',
    align: 'center',
  },
  {
    title: '视频合集编码',
    dataIndex: 'sphjbm',
    align: 'center',
  },
  {
    title: '视频章节编码',
    dataIndex: 'spzjbm',
    align: 'center',
  },
  {
    title: '广告名',
    dataIndex: 'ggm',
    align: 'center',
  },
  {
    title: '位置',
    dataIndex: 'wz',
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
