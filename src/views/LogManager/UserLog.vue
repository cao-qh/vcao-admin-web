<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      :columns="columns"
      :data="getData"
      :scroll="{ y: 'calc(100vh - 420px)' }"
      :showPagination="true"
    ></STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import { reqSearchUserLog } from '@/api/LogManager'
import dayjs from 'dayjs'

defineOptions({
  name: 'UserLog',
})

// 状态
const status = [
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
]

// 模块
const module = [
  {
    value: 1,
    label: '用户',
  },
  {
    value: 2,
    label: '支付',
  },
  {
    value: 3,
    label: '会员',
  },
  {
    value: 4,
    label: '积分',
  },
  {
    value: 5,
    label: '视频',
  },
  {
    value: 6,
    label: '用户协议',
  },
  {
    value: 7,
    label: '个人信息',
  },
  {
    value: 8,
    label: '设置',
  },
]

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    field: 'startTime',
    value: dayjs().subtract(15, 'day').format('YYYY-MM-DD HH:mm:ss'),
    showTime: true,
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    type: 'datePicker',
    label: '结束时间',
    field: 'endTime',
    value: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    showTime: true,
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    type: 'select',
    label: '状态',
    field: 'zhuangtai',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: status,
  },
  {
    type: 'input',
    label: '用户账户',
    field: 'shoujihao',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '模块',
    field: 'leixing',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: module,
  },
])

const columns = [
  {
    title: '用户账户',
    dataIndex: 'shoujihao',
    align: 'center',
  },
  {
    title: '用户姓名',
    dataIndex: 'xingming',
    align: 'center',
  },
  {
    title: '操作状态',
    dataIndex: 'zhuangtai',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = status.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '模块类型',
    dataIndex: 'leixing',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = module.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '操作详情',
    dataIndex: 'xiangqing',
    align: 'center',
  },
  {
    title: '操作ip',
    dataIndex: 'ipS',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
    align: 'center',
  },
]

const table = ref()

const getData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    data[item.field] = item.value
  })

  const res: any = await reqSearchUserLog(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}
</script>

<style></style>
