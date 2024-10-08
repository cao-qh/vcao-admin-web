<template>
  <a-modal
    title="修改Json数据"
    :open="open"
    width="50%"
    @ok="submit"
    @cancel="open = false"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item
        label="中英文参数"
        name="canshuZhongyingwen"
        :autoLink="false"
      >
        <a-flex :vertical="true" gap="20">
          <a-input
            v-for="item in zhongyingwenParams"
            :key="item.yw"
            :addon-before="item.zw"
            v-model:value="formState.canshuZhongyingwen[item.yw]"
          />
        </a-flex>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqUpdateJson, reqSearchJson } from '@/api/admin/system/params'

defineOptions({ name: 'Update' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

// 表单布局
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const formRef = ref()
const formState = reactive<any>({})
const zhongyingwenParams = ref<any>([])

const show = async (row: any) => {
  const res: any = await reqSearchJson({ id: row.id })
  if (res.code == 0) {
    open.value = true
    formState.id = row.id
    formState.canshuZhongyingwen = {}
    zhongyingwenParams.value = res.data
    res.data.forEach((item: any) => {
      formState.canshuZhongyingwen[item.yw] = item.cs
    })
  } else {
    message.error(res.msg)
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()

    formState.canshuZhongyingwen = JSON.stringify(formState.canshuZhongyingwen)

    const res: any = await reqUpdateJson(formState)
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success(res.msg)
    } else {
      message.error(res.msg)
      formState.canshuZhongyingwen = JSON.parse(formState.canshuZhongyingwen)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

defineExpose({
  show,
})
</script>
