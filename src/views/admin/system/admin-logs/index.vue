<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />
    <STable
      ref="table"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
    ></STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/admin/system/admin-log'
import dayjs from 'dayjs'

const leixing = [
  {
    value: 1,
    label: '接口模板',
  },
  {
    value: 2,
    label: '参数模板',
  },
  {
    value: 3,
    label: '管理员',
  },
  {
    value: 4,
    label: '分销商',
  },
  {
    value: 5,
    label: '产品',
  },
  {
    value: 6,
    label: '订单',
  },
  {
    value: 7,
    label: '个人信息',
  },
]

const zhuangtai = [
  {
    value: 1,
    label: '登录',
  },
  {
    value: 2,
    label: '添加',
  },
  {
    value: 3,
    label: '修改',
  },
  {
    value: 4,
    label: '删除',
  },
  {
    value: 5,
    label: '配置',
  },
  {
    value: 6,
    label: '下载',
  },
  {
    value: 7,
    label: '跳转',
  },
]

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    filed: 'kaiShiDate',
    value: dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
  },
  {
    type: 'datePicker',
    label: '结束时间',
    filed: 'jieShuDate',
    value: dayjs().format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
  },
  {
    type: 'input',
    label: '编码',
    filed: 'guanliyuanBianma',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '详情',
    filed: 'xiangqing',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '类型',
    filed: 'leixing',
    value: null,
    placeholder: '请输入',
    options: leixing,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
  {
    type: 'select',
    label: '操作状态',
    filed: 'zhuangtai',
    value: null,
    placeholder: '请输入',
    options: zhuangtai,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
])

const table = ref()

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '账户',
    dataIndex: 'guanliyuanBianma',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'leixing',
    align: 'center',
    customRender: ({ text }: { text: any }) => {
      const item: any = leixing.find((item) => item.value == text)
      return item ? item.label : ''
    },
  },
  {
    title: '操作状态',
    dataIndex: 'zhuangtai',
    align: 'center',
    customRender: ({ text }: { text: any }) => {
      const item: any = zhuangtai.find((item) => item.value == text)
      return item ? item.label : ''
    },
  },
  {
    title: '详情',
    dataIndex: 'xiangqing',
    align: 'center',
    width: '30%',
  },
  {
    title: 'IP',
    dataIndex: 'ipS',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
    align: 'center',
  },
]

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
      total: res.data.totalSize,
    }
  }
}
</script>

<style></style>
