<template>
  <div>
    <a-button type="primary" style="margin-bottom: 10px" @click="$emit('back')">
      返回
    </a-button>
    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

    <STable ref="table" :columns="columns" :data="reqData">
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'xuanchuantuUrl'">
          <a-image :src="baseUrl + row.xuanchuantuUrl" />
        </template>
        <template v-if="column.dataIndex === 'shangxiajia'">
          <a-popconfirm
            :disabled="row.peizhi === 0"
            title="确定要修改吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handelShangxiajia(row)"
          >
            <a-switch
              :disabled="row.peizhi === 0"
              :checked="row.shangxiajia === 1"
            />
          </a-popconfirm>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a @click="() => config.show(row, DLbianma)">配置</a>
        </template>
      </template>
    </STable>

    <Config
      ref="config"
      :settlement="settlement"
      :jiesuanzhouqi="jiesuanzhouqi"
      @success="table.refresh()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import {
  reqSearchProduct,
  reqConfigProductStatus,
} from '@/api/admin/channel/agent'
import { message } from 'ant-design-vue'
import Config from './modules/Config.vue'

defineOptions({ name: 'ConfigProduct' })

const props = defineProps<{
  DLbianma: string
}>()

const $emit = defineEmits(['back'])

const baseUrl = import.meta.env.VITE_SERVE

// 运营商
const operators = [
  {
    value: 1,
    label: '移动',
  },
  {
    value: 2,
    label: '联通',
  },
  {
    value: 3,
    label: '电信',
  },
  {
    value: 4,
    label: '广电',
  },
  {
    value: 5,
    label: '全网',
  },
]

// 结算方式
const settlement = [
  {
    value: 1,
    label: '长期分成',
  },
  {
    value: 2,
    label: 'CPA一口价',
  },
]

// 结算周期
const jiesuanzhouqi = [
  {
    value: 1,
    label: '实时',
  },
  {
    value: 2,
    label: '日结',
  },
  {
    value: 3,
    label: '周结',
  },
  {
    value: 4,
    label: '双周结',
  },
  {
    value: 5,
    label: '月结',
  },
]

const formItems = reactive([
  {
    type: 'input',
    label: '产品编码',
    filed: 'bianma',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '产品名称',
    filed: 'mingcheng',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '运营商',
    filed: 'yunyingshang',
    value: '',
    placeholder: '请输入',
    options: operators,
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
  {
    type: 'input',
    label: '归属地',
    filed: 'guishudi',
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
    title: '引流图',
    dataIndex: 'xuanchuantuUrl',
    align: 'center',
  },
  {
    title: '产品名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
  {
    title: '结算方式',
    dataIndex: 'jiesuanfangshi',
    align: 'center',
    customRender: ({ text }: { text: number }) => {
      const item = settlement.find((item) => item.value === text)
      return item ? item.label : ''
    },
  },
  {
    title: '结算周期',
    dataIndex: 'jiesuanzhouqi',
    align: 'center',
    customRender: ({ text }: { text: number }) => {
      const item = jiesuanzhouqi.find((item) => item.value === text)
      return item ? item.label : ''
    },
  },
  {
    title: '结算价格',
    dataIndex: 'dailiYongjinJine',
    align: 'center',
  },
  // {
  //   title: '配置',
  //   dataIndex: 'peizhi',
  //   align: 'center',
  // },
  {
    title: '上下架',
    dataIndex: 'shangxiajia',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]

const reqData = async () => {
  const data: any = {
    DLbianma: props.DLbianma,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
    }
  })

  const res: any = await reqSearchProduct(data)
  if (res.code == 0) {
    return {
      data: res.data,
      total: res.data.length,
    }
  }
}

// 上下架
const handelShangxiajia = async (row: any) => {
  const result = await reqConfigProductStatus({
    id: row.id,
    chanpinBianma: row.chanpinbianma,
    shangxiajia: row.shangxiajia === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    message.success(result.msg)
    table.value.refresh()
  } else {
    message.error(result.msg)
  }
}

// 配置
const config = ref()
</script>

<style></style>
