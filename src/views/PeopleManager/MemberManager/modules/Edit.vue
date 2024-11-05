<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="编码" name="bianma">
        <a-input
          v-model:value.trim="formState.bianma"
          placeholder="请输入"
          disabled
        ></a-input>
      </a-form-item>
      <a-form-item label="密码" name="mima">
        <a-input-password
          v-model:value.trim="formState.mima"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="名称" name="mingcheng">
        <a-input
          v-model:value.trim="formState.mingcheng"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="会员等级" name="huiyuandengji">
        <a-input-number
          :min="0"
          v-model:value="formState.huiyuandengji"
          placeholder="请选择"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="登录IP" name="dengluip">
        <a-textarea
          v-model:value.trim="formState.dengluip"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/PeopleManager/MemberManager'

defineOptions({ name: 'Edit' })

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
  bianma: [{ required: true, message: '请选择' }],
  mima: [
    {
      min: 6,
      message: '请输入6位以上密码',
    },
  ],
  mingcheng: [{ required: true, message: '请输入' }],
  huiyuandengji: [{ required: true, message: '请输入' }],
  dengluip: [{ required: true, message: '请输入' }],
}

const show = async (row: any) => {
  open.value = true
  formState.bianma = row.bianma
  formState.mima = row.mima
  formState.mingcheng = row.mingcheng
  formState.huiyuandengji = row.huiyuandengji
  formState.dengluip = row.dengluip
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
