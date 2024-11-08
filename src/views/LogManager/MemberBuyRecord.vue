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
import { reqSearchMemberBuyRecord } from '@/api/LogManager'
import dayjs from 'dayjs'
import { reqMember, reqVideoCollection, reqVideoChapter } from '@/api/common'

defineOptions({
  name: 'MemberBuyRecord',
})

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
    label: '会员编码',
    field: 'huiyuanBianma',
    value: '',
    placeholder: '请输入',
    options: async () => {
      const res = await reqMember()
      if (res.code == 0) {
        return res.data.map((item: any) => {
          return {
            label: `${item.bm}-${item.mc}`,
            value: item.bm,
          }
        })
      }
      return []
    },
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
  {
    type: 'select',
    label: '视频合集编码',
    field: 'shipinhejiBianma',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: async () => {
      const res = await reqVideoCollection()
      if (res.code == 0) {
        return res.data.map((item: any) => {
          return {
            label: `${item.bm}-${item.mc}`,
            value: item.bm,
          }
        })
      }
      return []
    },
  },
  {
    type: 'select',
    label: '视频章节编码',
    field: 'shipinzhangjieBianma',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: async () => {
      const res = await reqVideoChapter()
      if (res.code == 0) {
        return res.data.map((item: any) => {
          return {
            label: `${item.bianma}-${item.mingcheng}`,
            value: item.bianma,
          }
        })
      }
      return []
    },
  },
])

const columns = [
  {
    title: '会员编码',
    dataIndex: 'huiyuanBianma',
    align: 'center',
  },
  {
    title: '会员名称',
    dataIndex: 'huiYuanMingCheng',
    align: 'center',
  },
  {
    title: '视频合集编码',
    dataIndex: 'shipinhejiBianma',
    align: 'center',
    customCell: (record: any, rowIndex: any, column: any) => {
      console.log('record :>> ', record)
      console.log('rowIndex :>> ', rowIndex)
      console.log('column :>> ', column)
      // return {
      //   rowSpan: 2,
      // }
    },
  },
  {
    title: '视频合集名称',
    dataIndex: 'shiPinHejiMingCheng',
    align: 'center',
  },
  {
    title: '视频章节编码',
    dataIndex: 'shipinzhangjieBianma',
    align: 'center',
  },
  {
    title: '视频章节名称',
    dataIndex: 'shiPinZhangJieMingCheng',
    align: 'center',
  },
  {
    title: '观看时长(分钟)',
    dataIndex: 'guankanshijian',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshiajin',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'gengxinshiajin',
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

  const res: any = await reqSearchMemberBuyRecord(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}
</script>

<style></style>
