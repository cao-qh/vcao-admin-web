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
import { reqSearchMemberBalanceChangeRecord } from '@/api/LogManager'
import { reqMember } from '@/api/common'
import dayjs from 'dayjs'

defineOptions({
  name: 'MemberBalanceChangeRecord',
})

// 状态
const type = [
  {
    value: 1,
    label: '充值',
    color: 'green',
  },
  {
    value: 2,
    label: '兑换',
    color: 'blue',
  },
  {
    value: 3,
    label: '扣除',
    color: 'red',
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
    type: 'input',
    label: '变动金额',
    field: 'jine',
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
    type: 'input',
    label: '购剧订单号',
    field: 'goujudingdanhao',
    value: '',
    placeholder: '请输入',
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
    title: '变动金额',
    dataIndex: 'jine',
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
    title: '购剧订单号',
    dataIndex: 'goujudingdanhao',
    align: 'center',
  },
  {
    title: '变动时间',
    dataIndex: 'chuangjianshiajin',
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

  const res: any = await reqSearchMemberBalanceChangeRecord(data)
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
