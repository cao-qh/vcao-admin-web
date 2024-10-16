<template>
  <a-modal
    title="配置"
    :open="open"
    @ok="submit"
    width="800px"
    :bodyStyle="{ maxHeight: '600px', overflow: 'auto' }"
    @cancel="open = false"
  >
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      row-key="chanpinBianma"
      bordered
      :pagination="false"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'dailiYongjinJine'">
          <a-input-number
            :min="0"
            :precision="2"
            v-model:value.trim="record.dailiYongjinJine"
          />
        </template>
        <template v-if="column.dataIndex === 'jiesuanfangshi'">
          <a-select v-model:value="record.jiesuanfangshi" style="width: 120px">
            <a-select-option
              v-for="item in settlement"
              :value="item.value"
              :key="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </template>
        <template v-if="column.dataIndex === 'jiesuanzhouqi'">
          <a-select v-model:value="record.jiesuanzhouqi" style="width: 120px">
            <a-select-option
              v-for="item in jiesuanzhouqi"
              :value="item.value"
              :key="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqConfigProduct, reqSearchProduct } from '@/api/admin/channel/agent'

defineOptions({ name: 'BatchConfig' })

defineProps<{
  settlement: any
  jiesuanzhouqi: any
}>()

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

const selectedRowKeys = ref<any>([])

const selectRows = ref<any>([])

const dataSource = ref<any>(null)

const DLbianma = ref<string>('')

const columns = [
  {
    title: '产品编码',
    dataIndex: 'chanpinBianma',
    align: 'center',
  },
  {
    title: '代理编码',
    dataIndex: 'dailiBianma',
    align: 'center',
  },
  {
    title: '代理佣金金额',
    dataIndex: 'dailiYongjinJine',
    align: 'center',
  },
  {
    title: '结算方式',
    dataIndex: 'jiesuanfangshi',
    align: 'center',
  },
  {
    title: '结算周期',
    dataIndex: 'jiesuanzhouqi',
    align: 'center',
  },
]

const show = async (params: any) => {
  DLbianma.value = params.DLbianma
  selectedRowKeys.value = []
  selectRows.value = []
  const res: any = await reqSearchProduct(params)
  if (res.code == 0) {
    dataSource.value = res.data.map((item: any) => ({
      chanpinBianma: item.chanpinBianma,
      dailiBianma: item.dailiBianma,
      dailiYongjinJine: item.dailiYongjinJine || 0,
      jiesuanfangshi: item.jiesuanfangshi || 1,
      jiesuanzhouqi: item.jiesuanzhouqi || 1,
      shangxiajia: 1,
    }))
    open.value = true

    res.data.forEach((item: any) => {
      if (item.peizhi) {
        selectedRowKeys.value.push(item.chanpinBianma)
        selectRows.value.push(item)
      }
    })
  } else {
    message.error(res.msg)
  }
}

const submit = async () => {
  try {
    const res = await reqConfigProduct(DLbianma.value, selectRows.value)
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success(res.msg)
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

const onSelectChange = (selectedRowkeys: any, selectedrows: any) => {
  selectedRowKeys.value = selectedRowkeys
  selectRows.value = selectedrows
}

defineExpose({
  show,
})
</script>
