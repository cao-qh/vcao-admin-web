<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      :columns="columns"
      :data="getData"
      :scroll="{ y: 'calc(100vh - 420px)' }"
      :showPagination="true"
    >
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'leixing'">
          <span
            :style="{
              color: getType(row.leixing).color,
            }"
          >
            {{ getType(row.leixing).label }}
          </span>
        </template>
      </template>
    </STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import { reqSearchMemberCoinChangeRecord } from '@/api/LogManager'
import dayjs from 'dayjs'
import { reqMember } from '@/api/common'

defineOptions({
  name: 'UserLog',
})

// 类型
const type = [
  {
    value: 1,
    label: '添加',
    color: 'green',
  },
  {
    value: 2,
    label: '兑换',
    color: 'blue',
  },
]

// 模块
const module = [
  {
    value: 1,
    label: '签到',
  },
  {
    value: 2,
    label: '开宝箱',
  },
  {
    value: 3,
    label: '抽抽',
  },
  {
    value: 4,
    label: '看短剧',
  },
  {
    value: 5,
    label: '人工修改',
  },
  {
    value: 6,
    label: '积分兑换余额',
  },
]

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
    type: 'select',
    label: '会员编码',
    field: 'huiyuanBianma',
    value: null,
    placeholder: '请输入',
    options: async () => {
      const res = await reqMember()
      if (res.code == 0) {
        memberList.value = res.data.map((item: any) => {
          return {
            label: item.mc,
            value: item.bm,
          }
        })
      }
      return memberList.value
    },
  },
  {
    type: 'input',
    label: '积分',
    field: 'jifen',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '类型',
    field: 'leixing',
    value: null,
    placeholder: '请选择',
    options: type,
  },
  {
    type: 'input',
    label: '备注',
    field: 'beizhu',
    value: '',
    placeholder: '请输入',
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
    label: '获取积分模式',
    field: 'huoqujifenmoshi',
    value: null,
    placeholder: '请选择',
    options: module,
  },
])

const columns = [
  {
    title: '会员编码',
    dataIndex: 'huiyuanBianma',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = memberList.value.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '积分',
    dataIndex: 'jifen',
    align: 'center',
  },
  {
    title: '变动前',
    dataIndex: 'biandongqian',
    align: 'center',
  },
  {
    title: '变动后',
    dataIndex: 'biandonghou',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'leixing',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'beizhu',
    align: 'center',
  },
  {
    title: '订单号',
    dataIndex: 'dingdanhao',
    align: 'center',
  },
  {
    title: '获取积分模式',
    dataIndex: 'huoqujifenmoshi',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = module.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '变动时间',
    dataIndex: 'chuangjianshiajin',
    align: 'center',
  },
]

const memberList = ref<any>([])
const table = ref()

const getData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    data[item.field] = item.value
  })

  const res: any = await reqSearchMemberCoinChangeRecord(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}

// 获取类型
const getType = (value: number) => {
  const item: any = type.find((item: any) => item.value === value)
  return item
}
</script>

<style></style>
