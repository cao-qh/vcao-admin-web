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
import { reqSearchAdwatchOrOrderRecord } from '@/api/LogManager'
import { reqMember, reqAd } from '@/api/common'
import dayjs from 'dayjs'

defineOptions({
  name: 'AdwatchOrOrderRecord',
})

// 上级落地页返回状态
const luodiyefanhui = [
  {
    value: 1,
    label: '下单成功',
  },
  {
    value: 2,
    label: '订购成功',
  },
]

// 有效数据
const youxaoshuju = [
  {
    value: 1,
    label: '无效',
  },
  {
    value: 2,
    label: '有效',
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
    type: 'input',
    label: '订单号',
    field: 'dingdanhao',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '上级落地页返回状态',
    field: 'luodiyefanhui',
    value: null,
    placeholder: '请选择',
    options: luodiyefanhui,
  },
  {
    type: 'select',
    label: '广告编码',
    field: 'guanggaobianma',
    value: null,
    placeholder: '请选择',
    options: async () => {
      const res = await reqAd()
      if (res.code === 0) {
        return res.data.map((item: any) => {
          return {
            label: item.mingcheng,
            value: item.bianma,
          }
        })
      }
      return []
    },
  },
  {
    type: 'select',
    label: '会员编码',
    field: 'huiyuanbianma',
    value: null,
    placeholder: '请选择',
    options: async () => {
      const res = await reqMember()
      if (res.code === 0) {
        return res.data.map((item: any) => {
          return {
            label: item.mc,
            value: item.bm,
          }
        })
      }
      return []
    },
  },
  {
    type: 'select',
    label: '有效数据',
    field: 'youxaoshuju',
    value: null,
    placeholder: '请选择',
    options: youxaoshuju,
  },
])

const columns = [
  {
    title: '订单号',
    dataIndex: 'dingdanhao',
    align: 'center',
  },
  {
    title: '上级落地页返回状态',
    dataIndex: 'luodiyefanhui',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = luodiyefanhui.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '广告编码',
    dataIndex: 'guanggaobianma',
    align: 'center',
  },
  {
    title: '广告名称',
    dataIndex: 'guangGaoMingCheng',
    align: 'center',
  },
  {
    title: '观看时长',
    dataIndex: 'guankanhang',
    align: 'center',
  },
  {
    title: '会员编码',
    dataIndex: 'huiyuanbianma',
    align: 'center',
  },
  {
    title: '会员名称',
    dataIndex: 'huiYuanMingCheng',
    align: 'center',
  },
  {
    title: '有效数据',
    dataIndex: 'youxaoshuju',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = youxaoshuju.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '结束时间',
    dataIndex: 'jieshushiajin',
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

  const res: any = await reqSearchAdwatchOrOrderRecord(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}
</script>

<style></style>
