<template>
  <div>
    <a-space style="margin-bottom: 10px">
      <a-button type="primary" @click="$emit('back')">返回</a-button>
      <a-button type="primary" @click="() => batchConfig.show(DLbianma)">
        配置
      </a-button>
    </a-space>
    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

    <STable
      ref="table"
      :columns="columns"
      :data="reqData"
      row-key="chanpinBianma"
      :scroll="{ y: 'calc(100vh - 410px)' }"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #toolbar>
        <a-popconfirm
          title="确定要取消配置吗？"
          ok-text="是"
          cancel-text="否"
          @confirm="batchCancel"
        >
          <a-button type="primary">批量取消</a-button>
        </a-popconfirm>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'xuanchuantuUrl'">
          <a-image :width="80" :src="baseUrl + row.xuanchuantuUrl" />
        </template>

        <!-- <template v-if="column.dataIndex === 'action'">
          <a @click="() => config.show(row, DLbianma)">配置</a>
        </template> -->
      </template>
    </STable>

    <BatchConfig
      ref="batchConfig"
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
import { reqSearchProduct } from '@/api/admin/channel/agent'
import { message } from 'ant-design-vue'
import BatchConfig from './modules/BatchConfig.vue'

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

const guishudi = [
  '北京市',
  '天津市',
  '上海市',
  '重庆市',
  '河北省',
  '山西省',
  '辽宁省',
  '吉林省',
  '黑龙江省',
  '江苏省',
  '浙江省',
  '安徽省',
  '福建省',
  '江西省',
  '山东省',
  '河南省',
  '湖北省',
  '湖南省',
  '广东省',
  '海南省',
  '四川省',
  '贵州省',
  '云南省',
  '陕西省',
  '甘肃省',
  '青海省',
  '台湾省',
  '内蒙古自治区',
  '广西壮族自治区',
  '西藏自治区',
  '宁夏回族自治区',
  '新疆维吾尔自治区',
  '香港特别行政区',
  '澳门特别行政区',
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
    value: null,
    placeholder: '请输入',
    options: operators,
  },
  {
    type: 'select',
    label: '归属地',
    filed: 'guishudi',
    value: null,
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全国',
    },
    options: async () => {
      return guishudi.map((item) => {
        return {
          value: item,
          label: item,
        }
      })
    },
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

const selectedRowKeys = ref<any>([])
const selectedRows = ref<any>([])

const onSelectChange = (selectedRowkeys: any, selectedrows: any) => {
  selectedRowKeys.value = selectedRowkeys
  selectedRows.value = selectedrows
}

// 批量取消配置
const batchCancel = async () => {
  if (selectedRows.value.length == 0) {
    message.error('请选择产品')
    return
  }
  alert(selectedRowKeys.value.toString())
}

// 配置
const batchConfig = ref()
</script>

<style></style>
