<template>
  <a-modal
    title="修改"
    :open="open"
    :maskClosable="false"
    @ok="submit"
    @cancel="
      () => {
        open = false
        formRef.resetFields()
      }
    "
  >
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-row>
        <a-col :xs="24" :sm="24">
          <a-form-item label="回调地址" name="huitiaoUrl">
            <a-input
              v-model:value="formState.huitiaoUrl"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="IP白名单" name="ipS">
            <a-input v-model:value="formState.ipS" placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { editUserApi } from '@/api/agent/personal'

defineOptions({ name: 'Edit' })
// 定义方法
const $emit = defineEmits(['reload'])
const Props = defineProps(['userInfo'])
const open = defineModel('open')
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

watch(open, (val) => {
  if (val) {
    formState.id = Props.userInfo.id
    formState.ipS = Props.userInfo.ipS
    formState.huitiaoUrl = Props.userInfo.huitiaoUrl
  }
})

const rules = {
  huitiaoUrl: [{ required: true, message: '请输入' }],
  // ipS: [{ required: true, message: '请输入' }],
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res = await editUserApi(formState)
    if (res.code === 0) {
      $emit('reload')
      open.value = false
      message.success(res.msg)
      formRef.value.resetFields()
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}
</script>
