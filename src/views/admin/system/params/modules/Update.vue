<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="参数模板名称" name="canshuMingcheng">
        <a-input v-model:value.trim="formState.canshuMingcheng" />
      </a-form-item>
      <a-form-item label="备注" name="canshuBeizhu">
        <a-textarea v-model:value.trim="formState.canshuBeizhu"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqUpdate } from '@/api/admin/system/params'

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
  formState.id = row.id
  formState.canshuMingcheng = row.canshuMingcheng
  formState.canshuBeizhu = row.canshuBeizhu
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res: any = await reqUpdate(formState)
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

defineExpose({
  show,
})
</script>
