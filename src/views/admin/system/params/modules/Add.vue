<template>
  <a-modal
    title="添加"
    :open="open"
    width="50%"
    @ok="submit"
    @cancel="open = false"
    :bodyStyle="{ maxHeight: '500px', overflow: 'auto' }"
  >
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="参数模板名称" name="canshuMingcheng">
        <a-input
          v-model:value.trim="formState.canshuMingcheng"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="接口模板" name="jiekouBianma">
        <a-select
          showSearch
          v-model:value.trim="formState.jiekouBianma"
          :options="interfaceList"
          :fieldNames="{ label: 'mc', value: 'bm' }"
          :filterOption="filterOption"
          placeholder="请选择"
          @change="handleInterfaceChange"
        ></a-select>
      </a-form-item>
      <template v-if="zhongyingwenParams.length">
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
              v-model:value.trim="formState.canshuZhongyingwen[item.yw]"
            />
          </a-flex>
        </a-form-item>
      </template>
      <a-form-item label="备注" name="canshuBeizhu">
        <a-textarea
          v-model:value.trim="formState.canshuBeizhu"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="启禁用" name="qijinyong">
        <a-radio-group v-model:value="formState.qijinyong">
          <a-radio-button :value="1">启用</a-radio-button>
          <a-radio-button :value="2">禁用</a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd, reqSearchInterface } from '@/api/admin/system/params'
import { reqInterface } from '@/api/common'

defineOptions({ name: 'Add' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

// 表单布局
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const formRef = ref()
const formState = reactive<any>({})
const interfaceList = ref<any>([])
const zhongyingwenParams = ref<any>([])

const rules = {
  canshuMingcheng: [{ required: true, message: '请输入' }],
  jiekouBianma: [{ required: true, message: '请选择' }],
  canshuZhongyingwen: [{ required: true, message: '请输入' }],
}

const show = async () => {
  const res: any = await reqInterface()
  if (res.code == 0) {
    interfaceList.value = res.data
    open.value = true
    Object.assign(formState, {
      canshuMingcheng: '',
      jiekouBianma: null,
      canshuZhongyingwen: null,
      canshuBeizhu: '',
      qijinyong: 1,
    })
    zhongyingwenParams.value = []
    formRef.value?.clearValidate()
  } else {
    message.error(res.msg)
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)

    formState.canshuZhongyingwen = JSON.stringify(formState.canshuZhongyingwen)

    const res: any = await reqAdd(formState)
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

const handleInterfaceChange = async (value: any) => {
  const res: any = await reqSearchInterface({ jiekouBianma: value })
  if (res.code == 0) {
    zhongyingwenParams.value = res.data
    formState.canshuZhongyingwen = {}
    res.data.forEach((item: any) => {
      formState.canshuZhongyingwen[item.yw] = ''
    })
  } else {
    message.error(res.msg)
  }
}

const filterOption = (input: string, option: any) => {
  return option.mc.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

defineExpose({
  show,
})
</script>
