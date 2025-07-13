<template>
  <a-modal
    title="小类配置"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :maskClosable="false"
    width="700px"
    :body-style="{ maxHeight: '580px', overflow: 'auto' }"
  >
    <a-flex vertical gap="large" style="margin-right: 10px; padding: 5px 0">
      <div v-for="item in smallClassList" :key="item.bianma">
        <a-space style="font-size: 15px; user-select: none">
          <span
            style="border-radius: 100vw; padding: 3px 10px"
            :class="{ active: item.smallClassBianma ? false : true }"
            @click="handleLargeClassClick(item)"
          >
            {{ item.mingcheng }}
          </span>

          <span
            style="border-radius: 100vw; padding: 3px 10px"
            :class="{ active: item.smallClassBianma == item2.bianma }"
            v-for="item2 in item.tshipinHejiXiaoleiBeans"
            :key="item2.bianma"
            @click="handleSmallClassClick(item, item2)"
          >
            {{ item2.mingcheng }}
          </span>
        </a-space>
      </div>
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
      item.tshipinHejiXiaoleiBeans.forEach((item2: any) => {
        if (item2.peizhi == 1) {
          item.smallClassBianma = item2.bianma
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
      if (item.smallClassBianma) {
        data.push({
          shipinhejixiaoleibianma: item.smallClassBianma, //小类编码
          shipinhejibianma: bianma.value, //合集编码
        })
      }
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

// 处理小类点击
const handleSmallClassClick = (item: any, item2: any) => {
  item.smallClassBianma = item2.bianma
}

// 处理大类点击
const handleLargeClassClick = (item: any) => {
  item.smallClassBianma = ''
}

defineExpose({
  show,
})
</script>

<style scoped lang="scss">
.active {
  background-color: #c5f6fa;
  color: #0b7285;
}
</style>
