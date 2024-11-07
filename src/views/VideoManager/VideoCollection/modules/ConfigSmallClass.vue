<template>
  <a-modal
    title="小类配置"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :maskClosable="false"
    width="800px"
    :body-style="{ maxHeight: '580px', overflow: 'auto' }"
  >
    <a-flex vertical gap="large" style="margin-right: 10px">
      <a-flex
        vertical
        v-for="item in smallClassList"
        :key="item.bianma"
        style="border: 1px solid #ccc; padding: 10px; border-radius: 5px"
      >
        <a-space size="large" style="font-size: 15px; font-weight: bold">
          <span>大类编码：{{ item.bianma }}</span>
          <span>大类名称：{{ item.mingcheng }}</span>
        </a-space>
        <a-table
          rowKey="bianma"
          :columns="columns"
          :dataSource="item.tshipinHejiXiaoleiBeans"
          :pagination="false"
          :row-selection="{
            selectedRowKeys: item.selectKeys,
            onChange: (selectKeys: any, seleckRows: any) => {
              onSelectChange(selectKeys, seleckRows, item)
            },
          }"
        ></a-table>
      </a-flex>
    </a-flex>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  reqSearchSmallClass,
  reqConfigSmallClass,
} from '@/api/VideoManager/VideoCollection'

defineOptions({ name: 'ConfigSmallClass' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)
const smallClassList = ref<any>([])
const bianma = ref<string>('')

const columns = [
  {
    title: '小类编码',
    dataIndex: 'bianma',
    align: 'center',
  },
  {
    title: '小类名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
]

const show = async (row: any) => {
  const res: any = await reqSearchSmallClass({ bianma: row.bianma })
  if (res.code == 0) {
    if (res.data.length == 0) {
      message.error('无可配置小类')
      return
    }

    open.value = true
    smallClassList.value = res.data
    bianma.value = row.bianma
    smallClassList.value.forEach((item: any) => {
      item.selectKeys = []
      item.seleckRows = []
      item.tshipinHejiXiaoleiBeans.forEach((item2: any) => {
        if (item2.peizhi == 1) {
          item.selectKeys.push(item2.bianma)
          item.seleckRows.push(item2)
        }
      })
    })
  } else {
    message.error(res.message)
  }
}

const submit = async () => {
  try {
    const data: any = []
    smallClassList.value.forEach((item: any) => {
      item.seleckRows.forEach((item2: any) => {
        data.push({
          shipinhejixiaoleibianma: item2.bianma, //小类编码
          shipinhejibianma: bianma.value, //合集编码
        })
      })
    })

    const res = await reqConfigSmallClass(bianma.value, data)
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success('修改成功')
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

const onSelectChange = (selectKeys: any, seleckRows: any, item: any) => {
  item.selectKeys = selectKeys
  item.seleckRows = seleckRows
}

defineExpose({
  show,
})
</script>
