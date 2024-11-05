<template>
  <a-modal title="订购" :open="open" @ok="submit" @cancel="open = false">
    <div style="margin-bottom: 10px; font-weight: 600">
      会员编码：{{ bianma }}
    </div>
    <STable
      row-key="id"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        type: 'radio',
      }"
      :columns="columns"
      :scroll="{ x: 300 }"
      :data="reqData"
      :show-pagination="true"
    ></STable>
  </a-modal>
</template>
<script lang="ts" setup>
import STable from '@/components/STable/index.vue'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqOrder } from '@/api/PeopleManager/MemberManager'
import { reqSearch } from '@/api/AppConfig/MemberOrder'

defineOptions({ name: 'Order' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

const columns = [
  {
    title: '时长',
    dataIndex: 'shichang',
    align: 'center',
  },
  {
    title: '原价',
    dataIndex: 'yuanjia',
    align: 'center',
  },
  {
    title: '优惠价',
    dataIndex: 'youhuijia',
    align: 'center',
  },
]

const bianma = ref('')
const selectedRowKeys = ref<any>([])
const selectedRows = ref<any>([])

const show = async (row: any) => {
  open.value = true
  bianma.value = row.bianma
  selectedRowKeys.value = []
  selectedRows.value = []
}

const submit = async () => {
  try {
    if (selectedRows.value.length == 0) {
      message.error('请选择订单')
      return
    }

    const ord = selectedRows.value[0]

    const data = {
      bianma: bianma.value,
      id: ord.id,
      shichang: ord.shichang,
    }

    const res = await reqOrder(data)
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
  selectedRows.value = selectedrows
}

const reqData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }
  const res: any = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

defineExpose({
  show,
})
</script>
