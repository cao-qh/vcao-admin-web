<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="账户" name="shoujihao">
        <a-input v-model:value="formState.shoujihao" disabled />
      </a-form-item>
      <a-form-item label="注册时间" name="chuangjianshijian">
        <a-input v-model:value="formState.chuangjianshijian" disabled />
      </a-form-item>
      <a-form-item label="名称" name="mingcheng">
        <a-input v-model:value="formState.mingcheng" placeholder="请输入" />
      </a-form-item>
      <a-form-item
        label="邮箱"
        name="youxiang"
        :rules="[{ pattern: email, message: '请输入正确的邮箱' }]"
      >
        <a-input v-model:value="formState.youxiang" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="备注" name="beizhu" placeholder="请输入">
        <a-textarea
          v-model:value="formState.beizhu"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqSearchApi, reqUpdateApi } from '@/api/admin/channel/agent'
import { email } from '@/utils/regexp'

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
  const res: any = await reqSearchApi({ bianma: row.bianma })
  if (res.code === 0) {
    open.value = true
    formState.id = row.id
    formState.dailiBianma = row.dailiBianma
    formState.miyao = row.miyao
    formState.huitiaoUrl = row.huitiaoUrl
    formState.ipS = row.ipS
  } else {
    message.error(res.msg)
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res = await reqUpdateApi(formState)
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
