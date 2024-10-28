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
        <template v-if="column.dataIndex === 'sxj'">
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
            {{
              shangxiajia.find((item) => item.value === row.qijinyong)?.label
            }}
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
      :shangxiajia="shangxiajia"
      :updateStatus="updateStatus"
      @success="table.refresh()"
    />
    <Edit ref="edit" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { reqSearch, reqQijinyong } from '@/api/table/search/index'
import { STable } from '@/components/STable'
import { message } from 'ant-design-vue'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

// 上下架
const shangxiajia = [
  {
    value: 1,
    label: '上架',
  },
  {
    value: 2,
    label: '下架',
  },
]

// 推荐
const recommend = [
  {
    value: 1,
    label: '推荐',
  },
  {
    value: 2,
    label: '不推荐',
  },
]

// 更新状态
const updateStatus = [
  {
    value: 1,
    label: '更新',
  },
  {
    value: 2,
    label: '完结',
  },
]

const formItems = reactive([
  {
    type: 'input',
    label: '名称',
    filed: 'mc',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '上下架',
    filed: 'shangxiajia',
    value: '',
    placeholder: '请输入',
    options: shangxiajia,
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
  {
    type: 'select',
    label: '推荐',
    filed: 'recommend',
    value: '',
    placeholder: '请输入',
    options: recommend,
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
  {
    type: 'select',
    label: '类列',
    filed: 'll',
    value: '',
    placeholder: '请输入',
    options: [],
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
  {
    type: 'select',
    label: '更新状态',
    filed: 'updateStatus',
    value: '',
    placeholder: '请输入',
    options: updateStatus,
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
])

const columns = [
  {
    title: '编码',
    dataIndex: 'bm',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'mc',
    align: 'center',
  },
  {
    title: '缩略图',
    dataIndex: 'slt',
    align: 'center',
  },
  {
    title: '普通价格',
    dataIndex: 'ptjg',
    align: 'center',
  },
  {
    title: '会员价格',
    dataIndex: 'hyjg',
    align: 'center',
  },
  {
    title: '推荐',
    dataIndex: 'tj',
    align: 'center',
  },
  {
    title: '点赞数',
    dataIndex: 'dzs',
    align: 'center',
  },
  {
    title: '转发数',
    dataIndex: 'zfs',
    align: 'center',
  },
  {
    title: '浏览数',
    dataIndex: 'lls',
    align: 'center',
  },
  {
    title: '权重',
    dataIndex: 'qz',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'gxsj',
    align: 'center',
  },
  {
    title: '总集数',
    dataIndex: 'zjs',
    align: 'center',
  },
  {
    title: '更新状态',
    dataIndex: 'gxzt',
    align: 'center',
  },
  {
    title: '上下架',
    dataIndex: 'sxj',
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
      data[item.filed] = item.value
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
  const result = await reqQijinyong({
    id: row.id,
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
