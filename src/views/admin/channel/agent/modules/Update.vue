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
        <a-input
          v-model:value.trim="formState.mingcheng"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item
        label="邮箱"
        name="youxiang"
        :rules="[{ pattern: email, message: '请输入正确的邮箱' }]"
      >
        <a-input v-model:value.trim="formState.youxiang" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="备注" name="beizhu" placeholder="请输入">
        <a-textarea
          v-model:value.trim="formState.beizhu"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqUpdate } from '@/api/admin/channel/agent'
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
  open.value = true
  formState.id = row.id
  formState.shoujihao = row.shoujihao
  formState.chuangjianshijian = row.chuangjianshijian
  formState.bianma = row.bianma
  formState.mingcheng = row.mingcheng
  formState.youxiang = row.youxiang
  formState.beizhu = row.beizhu
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res = await reqUpdate(formState)
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
