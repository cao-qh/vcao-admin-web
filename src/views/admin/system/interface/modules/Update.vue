<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="接口编码" name="jiekouBianma">
        <a-input v-model:value="formState.jiekouBianma" disabled />
      </a-form-item>
      <a-form-item
        label="接口名称"
        name="jiekouMingcheng"
        :rules="[{ required: true, message: '请输入接口名称' }]"
      >
        <a-input v-model:value="formState.jiekouMingcheng" />
      </a-form-item>
      <a-form-item label="中文参数" name="zhongwen">
        <a-textarea v-model:value="formState.zhongwen"></a-textarea>
      </a-form-item>
      <a-form-item label="英文参数" name="yingwen">
        <a-textarea v-model:value="formState.yingwen"></a-textarea>
      </a-form-item>
      <a-form-item label="备注" name="beizhu">
        <a-textarea v-model:value="formState.beizhu"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqUpdate } from '@/api/admin/system/interface'

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
  formState.jiekouBianma = row.jiekouBianma
  formState.jiekouMingcheng = row.jiekouMingcheng
  formState.zhongwen = row.zhongwen
  formState.yingwen = row.yingwen
  formState.beizhu = row.beizhu
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
