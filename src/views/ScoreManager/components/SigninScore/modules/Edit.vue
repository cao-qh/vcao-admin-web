<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="第几天" name="dijitian">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.dijitian"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="第几天积分" name="dijitainjifen">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.dijitainjifen"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="连续签到天数" name="lainxuqiandaotianshu">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.lainxuqiandaotianshu"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="连续签到递增积分" name="lianxuqiaodaodizengjifen">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.lianxuqiaodaodizengjifen"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/ScoreManager/SigninScore'

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
  dijitian: [{ required: true, message: '请输入' }],
  dijitainjifen: [{ required: true, message: '请输入' }],
  lainxuqiandaotianshu: [{ required: true, message: '请输入' }],
  lianxuqiaodaodizengjifen: [{ required: true, message: '请输入' }],
}

const show = async (row: any) => {
  open.value = true
  formState.id = row.id
  formState.dijitian = row.dijitian
  formState.dijitainjifen = row.dijitainjifen
  formState.lainxuqiandaotianshu = row.lainxuqiandaotianshu
  formState.lianxuqiaodaodizengjifen = row.lianxuqiaodaodizengjifen
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
