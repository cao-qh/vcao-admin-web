<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="第几天" name="djt">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.djt"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="第几天积分" name="djtjf">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.djtjf"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="连续签到天数" name="lxqdts">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.lxqdts"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="连续签到递增积分" name="lxqdzjjf">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.lxqdzjjf"
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
import { reqAdd } from '@/api/table/search/index'

defineOptions({ name: 'Add' })

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
  djt: [{ required: true, message: '请输入' }],
  djtjf: [{ required: true, message: '请输入' }],
  lxqdts: [{ required: true, message: '请输入' }],
  lxqdzjjf: [{ required: true, message: '请输入' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    djt: '',
    djtjf: '',
    lxqdts: '',
    lxqdzjjf: '',
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)
    const res = await reqAdd(formState)
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
