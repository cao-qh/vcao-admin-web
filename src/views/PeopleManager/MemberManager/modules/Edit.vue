<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="头像" name="tx">
        <UploadImage
          v-model:value.trim="formState.tx"
          placeholder="请输入"
        ></UploadImage>
      </a-form-item>
      <a-form-item label="密码" name="mm">
        <a-input-password
          v-model:value.trim="formState.mm"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="名称" name="mc">
        <a-input v-model:value.trim="formState.mc" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="会员等级" name="hydj">
        <a-select v-model:value="formState.hydj" placeholder="请选择">
          <a-select-option :value="1">一级</a-select-option>
          <a-select-option :value="2">二级</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="登录IP" name="ips">
        <a-textarea
          v-model:value.trim="formState.ips"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/table/search/index'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Edit' })

// 属性
defineProps({
  position: {
    type: Array<any>,
    default: () => [],
  },
  jumpType: {
    type: Array<any>,
    default: () => [],
  },
})

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

const rules = {
  tx: [{ required: true, message: '请选择' }],
  mm: [{ required: true, message: '请选择' }],
  mc: [{ required: true, message: '请选择' }],
  hydj: [{ required: true, message: '请输入' }],
}

const show = async (row: any) => {
  open.value = true
  formState.tx = row.tx
  formState.mm = row.mm
  formState.mc = row.mc
  formState.hydj = row.hydj
  formState.ips = row.ips
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res = await reqEdit(formState)
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
