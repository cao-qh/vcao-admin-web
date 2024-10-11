<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      row-key="dingdanhao"
      :columns="columns"
      :data="getData"
      :showPagination="true"
      :scroll="{ x: 2050, y: 'calc(100vh - 510px)' }"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #toolbar>
        <a-popconfirm
          :title="`确定要批量推送吗？`"
          ok-text="是"
          cancel-text="否"
          @confirm="handleBatchPush"
        >
          <a-button v-has="'Btn.Order.BatchPush'" type="primary">
            批量推送
          </a-button>
        </a-popconfirm>
        <a-button
          v-has="'Btn.Order.Download'"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'dingdanbianma'">
          <MultipartTableCell>
            <template #label>
              <div>兴投订单编码：</div>
              <div>下级订单编码：</div>
              <div>上级订单编码：</div>
            </template>
            <template #value>
              <div>{{ row.dingdanhao }}</div>
              <div>{{ row.dingdanhaoXiaji }}</div>
              <div>{{ row.dingdanhaoShangji }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'chanpinxinxi'">
          <MultipartTableCell>
            <template #label>
              <div>产品名称：</div>
              <div>兴投产品编码：</div>
              <div>上级产品编码：</div>
            </template>
            <template #value>
              <div>{{ row.chanpinmingcheng }}</div>
              <div>{{ row.chanpinbianma }}</div>
              <div>{{ row.shangJiChanpinBianMa }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'qudaoshangxinixi'">
          <MultipartTableCell>
            <template #label>
              <div>上游渠道商：</div>
              <div>下游渠道商：</div>
            </template>
            <template #value>
              <div>{{ row.shangyouqudaoshang }}</div>
              <div>{{ row.xiayouqudaoshang }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'haomaxinxi'">
          <MultipartTableCell>
            <template #label>
              <div>办理手机号：</div>
              <div>验证码：</div>
            </template>
            <template #value>
              <div>{{ row.shoujihao }}</div>
              <div>{{ row.yanzhengma }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'tuiguangxinxi'">
          <MultipartTableCell>
            <template #label>
              <div>触点：</div>
              <div>产品页面链接：</div>
              <div>下级备注：</div>
            </template>
            <template #value>
              <div>{{ row.xiajiChudian }}</div>
              <div>{{ row.xiajiLuodiyeUrl }}</div>
              <div>{{ row.xiajiBeizhu }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'zhuangtaixinxi'">
          <MultipartTableCell>
            <template #label>
              <div>订单状态：</div>
              <div>校验结果：</div>
              <div>结果返回：</div>
            </template>
            <template #value>
              <div
                :style="{
                  color: getStatus(row.zhuangtai).color,
                }"
              >
                {{ getStatus(row.zhuangtai).label }}
              </div>
              <div>{{ row.jiaoyanJieguo }}</div>
              <div>{{ row.shouliJieguo }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'dinggoujiage'">
          <MultipartTableCell>
            <template #label>
              <div>订购价格：</div>
              <div>下级佣金：</div>
            </template>
            <template #value>
              <div>{{ row.dinggoujiage }}</div>
              <div>{{ row.xiajiYongjin }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'dizhixinxi'">
          <MultipartTableCell>
            <template #label>
              <div>省份：</div>
              <div>地址：</div>
            </template>
            <template #value>
              <div>{{ row.shengfen }}</div>
              <div>{{ row.dishi }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'shijianxinxi'">
          <MultipartTableCell>
            <template #label>
              <div>创建时间：</div>
              <div>校验时间：</div>
              <div>返回时间：</div>
            </template>
            <template #value>
              <div>{{ row.chuangjianshijian }}</div>
              <div>{{ row.jiaoyanshijian }}</div>
              <div>{{ row.shoulishijian }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <div>
            <a-popconfirm
              title="确定推送吗？"
              ok-text="是"
              cancel-text="否"
              @confirm="handlePush(row.dingdanhao)"
            >
              <a v-has="'Btn.Order.Push'">推送</a>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable, MultipartTableCell } from '@/components/STable'
import dayjs from 'dayjs'
import { reqOrder, reqPush, reqBatchPush, reqExport } from '@/api/admin/order'
import { message } from 'ant-design-vue'
import { selectQudaoshang } from '@/api/common'

defineOptions({
  name: 'Order',
})

// 订单状态
const status = [
  {
    value: 1,
    label: '校验失败',
    color: 'red',
  },
  {
    value: 2,
    label: '校验成功',
    color: 'blue',
  },
  {
    value: 3,
    label: '受理成功',
    color: 'orange',
  },
  {
    value: 4,
    label: '受理失败',
    color: 'green',
  },
  {
    value: 5,
    label: '未处理',
    color: 'green',
  },
  {
    value: 7,
    label: '客户取消',
    color: 'red',
  },
  {
    value: 8,
    label: '订购成功',
    color: 'green',
  },
]

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    filed: 'kaishiDate',
    value: dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    allowClear: false,
    disabledDate: (val: any) => {
      // 年份小于2024则不可选
      if (val.year() < 2024) {
        return true
      }

      const jieshuDate: any = formItems.find(
        (item) => item.filed === 'jieshuDate',
      )

      // 大于结束之间不可选
      if (val.valueOf() > dayjs(jieshuDate.value).valueOf()) {
        return true
      }

      // 小于接收时间31天内的都可以选择
      if (
        val.valueOf() < dayjs(jieshuDate.value).subtract(31, 'day').valueOf()
      ) {
        return true
      }

      return false
    },
  },
  {
    type: 'datePicker',
    label: '结束时间',
    filed: 'jieshuDate',
    value: dayjs().format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    allowClear: false,
    disabledDate: (val: any) => {
      // 年份小于2024则不可选
      if (val.year() < 2024) {
        return true
      }

      // 不可大于今天
      if (val.valueOf() > dayjs().valueOf()) {
        return true
      }
      return false
    },
    onChange: (date: string) => {
      const kaiShiDate: any = formItems.find(
        (item) => item.filed === 'kaiShiDate',
      )
      kaiShiDate.value = dayjs(date).subtract(31, 'day').format('YYYY-MM-DD')
    },
  },
  {
    type: 'select',
    label: '订单状态',
    filed: 'zhuangtai',
    value: null,
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: status,
  },
  {
    type: 'input',
    label: '兴投订单号',
    filed: 'dingdanhao',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '下级订单号',
    filed: 'dingdanhaoXiaji',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '上级订单号',
    filed: 'dingdanhaoShangji',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '兴投产品编码',
    filed: 'chanpinbianma',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '产品名称',
    filed: 'chanpinmingcheng',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '上游渠道商',
    filed: 'shangyouqudaoshang',
    value: null,
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: async () => {
      const res: any = await selectQudaoshang()
      if (res.code == 0) {
        return res.data.map((item: any) => ({
          value: item.quDaoBianMa,
          label: item.quDaoName,
        }))
      }
    },
  },
  {
    type: 'input',
    label: '办理手机号',
    filed: 'shoujihao',
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
    width: '80px',
  },
  {
    title: '订单编码',
    dataIndex: 'dingdanbianma',
    align: 'center',
    width: '300px',
    fixed: 'left',
  },
  // {
  //   title: '兴投订单编码',
  //   dataIndex: 'dingdanhao',
  //   align: 'center',
  // },
  // {
  //   title: '下级订单号',
  //   dataIndex: 'dingdanhaoXiaji',
  //   align: 'center',
  // },
  // {
  //   title: '上级订单号',
  //   dataIndex: 'dingdanhaoShangji',
  //   align: 'center',
  // },
  {
    title: '产品信息',
    dataIndex: 'chanpinxinxi',
    align: 'center',
    width: '250px',
  },
  // {
  //   title: '兴投产品编码',
  //   dataIndex: 'chanpinbianma',
  //   align: 'center',
  // },
  // {
  //   title: '产品名称',
  //   dataIndex: 'chanpinmingcheng',
  //   align: 'center',
  // },
  // {
  //   title: '上级产品编码',
  //   dataIndex: 'shangJiChanpinBianMa',
  //   align: 'center',
  // },
  {
    title: '渠道商信息',
    dataIndex: 'qudaoshangxinixi',
    align: 'center',
    width: '190px',
  },
  // {
  //   title: '下游渠道商',
  //   dataIndex: 'xiayouqudaoshang',
  //   align: 'center',
  // },
  // {
  //   title: '上游渠道商',
  //   dataIndex: 'shangyouqudaoshang',
  //   align: 'center',
  // },
  {
    title: '号码信息',
    dataIndex: 'haomaxinxi',
    align: 'center',
    width: '210px',
  },
  // {
  //   title: '办理手机号',
  //   dataIndex: 'shoujihao',
  //   align: 'center',
  // },
  // {
  //   title: '验证码',
  //   dataIndex: 'yanzhengma',
  //   align: 'center',
  // },
  {
    title: '推广信息',
    dataIndex: 'tuiguangxinxi',
    align: 'center',
    width: '200px',
  },
  // {
  //   title: '触点',
  //   dataIndex: 'xiajiChudian',
  //   align: 'center',
  // },
  // {
  //   title: '产品页面链接',
  //   dataIndex: 'xiajiLuodiyeUrl',
  //   align: 'center',
  // },
  // {
  //   title: '下级备注',
  //   dataIndex: 'xiajiBeizhu',
  //   align: 'center',
  // },
  {
    title: '状态信息',
    dataIndex: 'zhuangtaixinxi',
    align: 'center',
    width: '160px',
  },
  // {
  //   title: '订单状态',
  //   dataIndex: 'zhuangtai',
  //   align: 'center',
  //   customRender: ({ text }: { text: any }) => {
  //     const item: any = status.find((item) => item.value === text)
  //     return h('span', { style: { color: item.color } }, item.label)
  //   },
  // },
  // {
  //   title: '校验结果',
  //   dataIndex: 'jiaoyanJieguo',
  //   align: 'center',
  // },
  // {
  //   title: '结果返回',
  //   dataIndex: 'shouliJieguo',
  //   align: 'center',
  // },
  {
    title: '价格信息',
    dataIndex: 'dinggoujiage',
    align: 'center',
    width: '130px',
  },
  // {
  //   title: '订购价格',
  //   dataIndex: 'dinggoujiage',
  //   align: 'center',
  // },
  // {
  //   title: '下级佣金',
  //   dataIndex: 'xiajiYongjin',
  //   align: 'center',
  // },
  {
    title: '地址信息',
    dataIndex: 'dizhixinxi',
    align: 'center',
    width: '120px',
  },
  // {
  //   title: '省份',
  //   dataIndex: 'shengfen',
  //   align: 'center',
  // },
  // {
  //   title: '地址',
  //   dataIndex: 'dishi',
  //   align: 'center',
  // },
  {
    title: '时间信息',
    dataIndex: 'shijianxinxi',
    align: 'center',
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'chuangjianshijian',
  //   align: 'center',
  // },
  // {
  //   title: '校验时间',
  //   dataIndex: 'jiaoyanshijian',
  //   align: 'center',
  // },
  // {
  //   title: '返回时间',
  //   dataIndex: 'shoulishijian',
  //   align: 'center',
  // },
  {
    title: '操作',
    width: '100px',
    dataIndex: 'action',
    align: 'center',
    fixed: 'right',
  },
]

const getStatus = (value: number) => {
  const item: any = status.find((item) => item.value === value)
  return item
}

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

  const res: any = await reqOrder(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}

// 推送
const handlePush = async (tOrderId: any) => {
  const res = await reqPush({ tOrderId })
  if (res.code == 0) {
    message.success(res.msg)
    table.value.refresh()
  } else {
    message.error(res.msg)
  }
}

// 导出
const handleExport = async () => {
  const data: any = {}
  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
    }
  })

  const res = await reqExport(data)
  if (res.code === 0) {
    message.success(res.msg)
  } else {
    message.error(res.msg)
  }
}

const selectedRowKeys = ref<any>([])
const onSelectChange = (sRowKeys: any) => {
  selectedRowKeys.value = sRowKeys
}
// 批量推送
const handleBatchPush = async () => {
  const res = await reqBatchPush({ tOrderIds: selectedRowKeys.value.join(',') })
  if (res.code == 0) {
    message.success(res.msg)
    table.value.refresh()
  } else {
    message.error(res.msg)
  }
}
</script>
