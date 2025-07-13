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
import { reqSearchMemberCatchRecord } from '@/api/LogManager'
import dayjs from 'dayjs'
import { reqMember, reqVideoCollection, reqVideoChapter } from '@/api/common'

defineOptions({
  name: 'MemberCatchRecord',
})

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    field: 'startTime',
    value: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    showTime: true,
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    disabledDate: (val: any) => {
      const endTime: any = formItems.find((item) => item.field === 'endTime')

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
    field: 'endTime',
    value: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    showTime: true,
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    disabledDate: (val: any) => {
      // 不可大于今天
      if (val.valueOf() > dayjs().valueOf()) {
        return true
      }
      return false
    },
  },
  {
    type: 'input',
    label: '观看时间',
    field: 'guankanshijian',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '会员编码',
    field: 'huiyuanBianma',
    value: null,
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
  },
  {
    type: 'select',
    label: '视频合集编码',
    field: 'shipinhejiBianma',
    value: null,
    placeholder: '请选择',
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
    value: null,
    placeholder: '请选择',
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
    customCell: (record: any) => {
      if (record.count) {
        return {
          rowSpan: record.count,
        }
      } else {
        return {
          rowSpan: 0,
        }
      }
    },
  },
  {
    title: '视频合集名称',
    dataIndex: 'shiPinHejiMingCheng',
    align: 'center',
    customCell: (record: any) => {
      if (record.count) {
        return {
          rowSpan: record.count,
        }
      } else {
        return {
          rowSpan: 0,
        }
      }
    },
  },
  {
    title: '视频章节名称',
    dataIndex: 'shiPinZhangJieMingCheng',
    align: 'center',
  },
  {
    title: '观看时间(分钟)',
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

  const res: any = await reqSearchMemberCatchRecord(data)
  if (res.code == 0) {
    // 统计相邻的相同数量
    if (res.data.list && res.data.list.length > 0) {
      let i = 0
      let tempRow = res.data.list[i]
      tempRow.count = 0
      for (; i < res.data.list.length; i++) {
        const row = res.data.list[i]
        if (tempRow.shipinhejiBianma === row.shipinhejiBianma) {
          tempRow.count++
        } else {
          tempRow = row
          tempRow.count = 1
        }
      }
    }

    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}
</script>

<style></style>
