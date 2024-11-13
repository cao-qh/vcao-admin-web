<template>
  <div>
    <a-row style="margin-bottom: 10px">
      <a-flex align="center">
        <a-col>
          <span style="">金额：</span>
        </a-col>
        <a-col>
          <a-input-number
            :min="0"
            v-model:value.trim="jine"
            addon-after="元"
            @blur="handleBlur"
          />
        </a-col>
      </a-flex>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqSearch, reqEdit } from '@/api/ScoreManager/ScoreExchange'
import { message } from 'ant-design-vue'

const jine = ref<any>('')

onMounted(() => {
  gatData()
})

const gatData = async () => {
  const res = await reqSearch()
  if (res.code == 0) {
    jine.value = res.data.jine
  } else {
    message.error(res.msg)
  }
}

const handleBlur = async () => {
  const res = await reqEdit({ jine: jine.value })
  if (res.code == 0) {
    message.success('修改成功')
  } else {
    message.error(res.msg)
  }
}
</script>
