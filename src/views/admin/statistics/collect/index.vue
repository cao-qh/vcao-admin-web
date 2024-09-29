<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      :columns="columns"
      :data="getData"
      :scroll="{ y: 'calc(100vh - 290px)' }"
    >
      <template #toolbar>
        <a-button type="primary" @click="() => add.show()">导出</a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'shangXiaJia'">
          <a-popconfirm
            title="确定要上下架吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handelShangxiajia(row)"
          >
            <a-switch :checked="row.shangXiaJia === 1" />
          </a-popconfirm>
        </template>

        <template v-if="column.dataIndex === 'goodspic'">
          <a-image
            :src="baseUrl + row.goodspic"
            width="60px"
            height="60px"
          ></a-image>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <div>
            <div>
              <a @click="() => edit.show(row)">修改套餐</a>
              <br />
              <a
                @click="
                  () => {
                    editDetail.show(row)
                  }
                "
              >
                修改详情
              </a>
              <br />
            </div>

            <!-- <a v-partner @click="() => config.show(row)">配置</a> -->
          </div>
        </template>
      </template>
    </STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, h } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import { reqGoods, reqShangxiajia } from '@/api/admin/goods'
import {
  reqProvince,
  reqFanyongType,
  reqOperator,
  // reqPhonePool,
} from '@/api/common'
import { message } from 'ant-design-vue'
import useUserStore from '@/store/modules/user'
import dayjs, { Dayjs } from 'dayjs'

defineOptions({
  name: 'Collect',
})

const baseUrl = import.meta.env.VITE_SERVE

const del = [
  {
    value: 1,
    label: '启用',
    color: 'green',
  },
  {
    value: 2,
    label: '禁用',
    color: 'red',
  },
]

const shangXiaJia = [
  {
    value: 1,
    label: '上架',
    color: 'green',
  },
  {
    value: 2,
    label: '下架',
    color: 'red',
  },
]
const guishudi = {
  2: '分省',
}

const operate = {
  1: '移动',
  2: '联通',
  3: '电信',
  4: '全网',
}

// 禁用平台
const disPlatform = [
  {
    value: 1,
    label: '抖店',
  },
  {
    value: 2,
    label: '快手小店',
  },
  {
    value: 3,
    label: '直播',
  },
  {
    value: 4,
    label: '信息流',
  },
  {
    value: 5,
    label: '拼多多',
  },
  {
    value: 6,
    label: '京东',
  },
  {
    value: 7,
    label: '天猫',
  },
  {
    value: 8,
    label: '线下',
  },
  {
    value: 9,
    label: '推广连接',
  },
  {
    value: 10,
    label: '其他',
  },
]

onMounted(() => {})

let startTime = ref(dayjs().format('YYYY-MM-DD'))
let endTime = ref(dayjs().format('YYYY-MM-DD'))

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    filed: 'startTime',
    value: startTime,
    disabledDate: (val: Dayjs) => {
      return (
        val < dayjs(endTime.value).subtract(31, 'days') ||
        val > dayjs(endTime.value)
      )
    },
    valueFormat: 'YYYY-MM-DD',
    placeholder: '请选择',
  },
  {
    type: 'datePicker',
    label: '结束时间',
    filed: 'endTime',
    value: endTime,
    disabledDate: (val: Dayjs) => {
      return val > dayjs().endOf('year')
    },
    valueFormat: 'YYYY-MM-DD',
    placeholder: '请选择',
    onChange: (date: string) => {
      console.log(date)
      if (
        dayjs(startTime.value) > dayjs(date) ||
        dayjs(startTime.value).add(31, 'days') < dayjs(date)
      ) {
        startTime.value = dayjs(date).startOf('day').format('YYYY-MM-DD')
      }
    },
  },
  {
    type: 'input',
    label: '产品编码',
    filed: 'packageNickname',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '运营商',
    filed: 'packageNickname',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: async () => {
      return Object.keys(operate).map((key) => {
        return {
          value: key,
          label: operate[key],
        }
      })
    },
  },
  {
    type: 'select',
    label: '归属地',
    filed: 'goodsCode',
    value: 1,
    placeholder: '请选择',
    defaultOption: {
      value: 1,
      label: '全国',
    },
    options: async () => {
      return Object.keys(guishudi).map((key) => {
        return {
          value: key,
          label: guishudi[key],
        }
      })
    },
  },
])

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '上级渠道名称',
    dataIndex: 'goodspic',
    align: 'center',
  },
  {
    title: '上级渠道编码',
    dataIndex: 'packageNickname',
    align: 'center',
  },
  {
    title: '产品编码',
    dataIndex: 'goodsName',
    align: 'center',
  },
  {
    title: '产品名称',
    dataIndex: 'goodsName',
    align: 'center',
  },
  {
    title: '资费',
    dataIndex: 'goodsName',
    align: 'center',
  },
  {
    title: '校验成功',
    dataIndex: 'goodsName',
    align: 'center',
  },
  {
    title: '校验失败',
    dataIndex: 'goodsName',
    align: 'center',
  },
  {
    title: '订购成功',
    dataIndex: 'goodsName',
    align: 'center',
  },
  {
    title: '订购失败',
    dataIndex: 'goodsName',
    align: 'center',
  },
  {
    title: '未处理',
    dataIndex: 'createTime',
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
    if (item.value) {
      data[item.filed] = item.value
    }
  })

  const res: any = await reqGoods(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

// 启禁用
// const handelQqijinyong = async (row: any) => {
//   const result: any = await reqQijinyong({
//     id: row.id,
//     del: row.del === 1 ? 2 : 1,
//   })
//   if (result.code == 200) {
//     message.success(result.message)
//   } else {
//     message.error(result.message)
//   }
// }

// 上下架
const handelShangxiajia = async (row: any) => {
  const result: any = await reqShangxiajia({
    goodsId: row.id,
    shangXiaJia: row.shangXiaJia === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    table.value.refresh()
    message.success(result.msg)
  } else {
    message.error(result.msg)
  }
}

// 查看详情
const editDetail = ref()
// 添加
const add = ref()
// 修改
const edit = ref()
// 配置
const config = ref()
</script>

<style></style>
