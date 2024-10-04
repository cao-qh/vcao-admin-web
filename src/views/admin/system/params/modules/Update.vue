<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="参数模板名称" name="参数模板名称">
        <a-input v-model:value="formState.参数模板名称" />
      </a-form-item>
      <a-form-item label="接口模板" name="接口模板">
        <a-select v-model:value="formState.接口模板">
          <a-select-option value="a">模板一</a-select-option>
          <a-select-option value="b">模板二</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqUpdateSubmit } from '@/api/table/search/index'

defineOptions({ name: 'Update' })

// 定义方法
const $emit = defineEmits(['success'])

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
  open.value = true
  formState.dingdanhao = row.dingdanhao
  formState.tongdao = row.tongdao
  formState.mianzhi = row.mianzhi
  formState.address = row.address
  formState.beizhu = row.beizhu
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res = await reqUpdateSubmit(formState)
    if (res.code == 200) {
      $emit('success')
      open.value = false
      message.success(res.message)
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

defineExpose({
  show,
})
</script>
