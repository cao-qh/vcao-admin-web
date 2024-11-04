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
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.MemberBuyOrder.Download'"
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
      </template>
    </STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable, MultipartTableCell } from '@/components/STable'
import dayjs from 'dayjs'
import { reqSearch } from '@/api/table/search/index'
// import { message } from 'ant-design-vue'

defineOptions({
  name: 'MemberBuyOrder',
})

// 支付类型
const payType = [
  {
    value: 1,
    label: '未支付',
    color: 'red',
  },
  {
    value: 2,
    label: '已支付',
    color: 'green',
  },
]

// 购买类型
const buyType = [
  {
    value: 1,
    label: '全剧',
    color: 'red',
  },
  {
    value: 2,
    label: '单章',
    color: 'green',
  },
  {
    value: 3,
    label: '小时会员',
    color: 'green',
  },
]

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    field: 'kaishiDate',
    value: dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    allowClear: false,
  },
  {
    type: 'datePicker',
    label: '结束时间',
    field: 'jieshuDate',
    value: dayjs().format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    allowClear: false,
  },
  {
    type: 'input',
    label: '订单号',
    field: 'ddh',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '会员',
    field: 'hy',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: [],
  },
  {
    type: 'select',
    label: '支付类型',
    field: 'payType',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: payType,
  },
  {
    type: 'select',
    label: '购买类型',
    field: 'buyType',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: buyType,
  },
])

const table = ref()

const columns = [
  {
    title: '订单号',
    dataIndex: 'ddh',
    align: 'center',
  },
  {
    title: '会员编码',
    dataIndex: 'hybm',
    align: 'center',
  },
  {
    title: '会员名称',
    dataIndex: 'hymc',
    align: 'center',
  },
  {
    title: '原始价格',
    dataIndex: 'ysjg',
    align: 'center',
  },
  {
    title: '支付价格',
    dataIndex: 'zfjg',
    align: 'center',
  },
  {
    title: '支付方式',
    dataIndex: 'zhuangtaixinxi',
    align: 'center',
  },
  {
    title: '支付类型',
    dataIndex: 'dinggoujiage',
    align: 'center',
  },
  {
    title: '购买类型',
    dataIndex: 'gmlx',
    align: 'center',
  },
  {
    title: '视频合集',
    dataIndex: 'sphj',
    align: 'center',
  },
  {
    title: '视频章节',
    dataIndex: 'spzj',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'cjsj',
    align: 'center',
  },
  {
    title: '发起支付时间',
    dataIndex: 'fqzfsj',
    align: 'center',
  },
  {
    title: '支付成功时间',
    dataIndex: 'zfcg',
    align: 'center',
  },
  {
    title: '第三方订单号',
    dataIndex: 'dsfddh',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'bz',
    align: 'center',
  },
  {
    title: '时长',
    dataIndex: 'sc',
    align: 'center',
  },
]

const getData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.field] = item.value
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

// 导出
const handleExport = async () => {
  // const data: any = {}
  // formItems.forEach((item) => {
  //   if (item.value) {
  //     data[item.field] = item.value
  //   }
  // })
  // const res = await reqExport(data)
  // if (res.code === 0) {
  //   message.success(res.msg)
  // } else {
  //   message.error(res.msg)
  // }
}
</script>
