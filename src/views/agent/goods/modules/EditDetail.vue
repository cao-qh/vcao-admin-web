<template>
  <a-modal
    title="产品详情"
    :open="open"
    :footer="null"
    @cancel="open = false"
    :maskClosable="false"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="产品编码" name="chanpinBianma">
        <a-input v-model:value="formState.chanpinBianma" disabled />
      </a-form-item>
      <a-form-item label="产品详情" name="chanpinXiangqing">
        <a-textarea
          v-model:value="formState.chanpinXiangqing"
          readOnly
        ></a-textarea>
      </a-form-item>
      <a-form-item label="返佣说明" name="fanyongshuoming">
        <a-textarea
          v-model:value="formState.fanyongshuoming"
          readOnly
        ></a-textarea>
      </a-form-item>
      <a-form-item label="宣传图" name="fileXC">
        <a-image :width="150" :src="formState.fileXC" alt="宣传图" />
      </a-form-item>
      <a-form-item label="落地页图" name="fileLD">
        <a-image :width="150" :src="formState.fileLD" alt="落地页图" />
      </a-form-item>
      <a-form-item label="确认页面图" name="fileQR">
        <a-image :width="150" :src="formState.fileQR" alt="确认页面图" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqDetail } from '@/api/agent/goods'

const imgBase = import.meta.env.VITE_APP_IMG_BASE
defineOptions({ name: 'EditDetail' })

const open = ref<boolean>(false)

// 表单布局
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 13 },
  },
}

const formRef = ref()
const formState = reactive<any>({})

const show = async (row: any) => {
  const res: any = await reqDetail({ chanpinBianma: row.bianma })
  if (res.code == 0) {
    open.value = true
    formState.id = res.data.id
    formState.chanpinBianma = res.data.chanpinBianma
    formState.chanpinXiangqing = res.data.chanpinXiangqing
    formState.fanyongshuoming = res.data.fanyongshuoming
    formState.fileXC = imgBase + res.data.luodiyeUrl
    formState.fileLD = imgBase + res.data.querentuUrl
    formState.fileQR = imgBase + res.data.xuanchuantuUrl
  } else {
    message.error(res.message)
  }
}

const rules = {
  chanpinXiangqing: [{ required: true, message: '请输入' }],
  fanyongshuoming: [{ required: true, message: '请输入' }],
  fileXC: [{ required: true, message: '请选择' }],
  fileLD: [{ required: true, message: '请选择' }],
  fileQR: [{ required: true, message: '请选择' }],
}

defineExpose({
  show,
})
</script>
