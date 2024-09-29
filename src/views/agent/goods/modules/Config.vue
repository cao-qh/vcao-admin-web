<template>
  <a-modal
    title="配置"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :maskClosable="false"
  >
    <a-flex gap="20" wrap="wrap">
      <a-checkbox
        v-for="item in accountList"
        :key="item.name"
        :checked="item.type !== 0"
        @change="handleChange(item)"
      >
        {{ item.name }}
      </a-checkbox>
    </a-flex>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqConfig, reqConfigEdit } from '@/api/agent/goods/index'

defineOptions({ name: 'Config' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)
const accountList = ref<any>([])
const goodsId = ref<number>(0)

const show = async (row: any) => {
  const res: any = await reqConfig({ goodsId: row.id })
  if (res.code == 0) {
    if (res.data.length == 0) {
      message.error('您还没有合伙人，或合伙人未实名')
      return
    }

    open.value = true
    accountList.value = res.data
    goodsId.value = row.id
  } else {
    message.error(res.message)
  }
}

const submit = async () => {
  try {
    const data: any = {
      goodsId: goodsId.value,
    }

    accountList.value.forEach((item: any) => {
      data[item.name] = item.type
    })

    const res = await reqConfigEdit(data)
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

const handleChange = (item: any) => {
  item.type = item.type === 0 ? 1 : 0
}

defineExpose({
  show,
})
</script>
