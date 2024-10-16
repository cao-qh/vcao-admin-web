<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />
    <STable
      ref="table"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ y: 'calc(100vh - 390px)' }"
    ></STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/admin/system/config-log'
import dayjs from 'dayjs'
import { reqSearchAdmin } from '@/api/common'

const leixing = [
  {
    value: 1,
    label: '产品',
  },
  {
    value: 2,
    label: '订单',
  },
  {
    value: 3,
    label: '个人信息',
  },
]

const zhuangtai = [
  {
    value: 1,
    label: '添加',
  },
  {
    value: 2,
    label: '修改',
  },
  {
    value: 3,
    label: '删除',
  },
]

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    filed: 'startTime',
    value: dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    disabledDate: (val: any) => {
      const endTime: any = formItems.find((item) => item.filed === 'endTime')

      // 大于结束之间不可选
      if (val.valueOf() > dayjs(endTime.value).valueOf()) {
        return true
      }
      // 小于接收时间31天内的都可以选择
      if (val.valueOf() < dayjs(endTime.value).subtract(31, 'day').valueOf()) {
        return true
      }

      return false
    },
  },
  {
    type: 'datePicker',
    label: '结束时间',
    filed: 'endTime',
    value: dayjs().format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    disabledDate: (val: any) => {
      // 不可大于今天
      if (val.valueOf() > dayjs().valueOf()) {
        return true
      }
      return false
    },
    onChange: (date: string) => {
      const startTime: any = formItems.find(
        (item) => item.filed === 'startTime',
      )
      startTime.value = dayjs(date).subtract(31, 'day').format('YYYY-MM-DD')
    },
  },
  {
    type: 'select',
    label: '管理员编码',
    filed: 'guanliyuanBianma',
    value: '',
    placeholder: '请输入',
    options: async () => {
      const res: any = await reqSearchAdmin()
      if (res.code == 0) {
        return res.data.map((item: any) => {
          return {
            value: item.bianma,
            label: `${item.bianma}-${item.mingcheng}`,
          }
        })
      }
      return []
    },
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
  {
    type: 'select',
    label: '状态',
    filed: 'zhuangtai',
    value: 0,
    placeholder: '全部',
    options: zhuangtai,
    defaultOption: {
      label: '全部',
      value: 0,
    },
  },
  {
    type: 'input',
    label: '详情',
    filed: 'xiangqing',
    value: '',
    placeholder: '请输入',
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
    title: '管理员编码',
    dataIndex: 'guanliyuanBianma',
    align: 'center',
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
