<template>
  <a-modal
    title="修改"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :maskClosable="false"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-row>
        <a-col :xs="24" :sm="24">
          <a-form-item label="ID" name="id">
            <a-input
              v-model:value="formState.id"
              disabled
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="上级编码" name="shangjiBianma">
            <a-input
              v-model:value="formState.shangjiBianma"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="上级名称" name="shangjiMingcheng">
            <a-input
              v-model:value="formState.shangjiMingcheng"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="产品月费" name="dinggoujiage">
            <a-input-number
              style="width: 100%"
              v-model:value="formState.dinggoujiage"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="运营商" name="yunyingshang">
            <a-select
              v-model:value="formState.yunyingshang"
              placeholder="请选择"
            >
              <a-select-option
                v-for="(value, key) in operate"
                :key="key"
                :value="key"
              >
                {{ value }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24">
          <a-form-item label="归属地" name="guishudi">
            <a-input v-model:value="formState.guishudi" placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/admin/goods'

defineOptions({ name: 'Edit' })

// 属性
withDefaults(
  defineProps<{
    operate: any
  }>(),
  {
    operate: () => ({}),
  },
)

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

const rules = {
  shangjiBianma: [{ required: true, message: '请输入' }],
  shangjiMingcheng: [{ required: true, message: '请输入' }],
  yunyingshang: [{ required: true, message: '请选择' }],
  guishudi: [{ required: true, message: '请输入' }],
  dinggoujiage: [{ required: true, message: '请输入' }],
}

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
  formState.shangjiBianma = row.shangjiBianma
  formState.shangjiMingcheng = row.shangjiMingcheng
  formState.yunyingshang = row.yunyingshang + ''
  formState.guishudi = row.guishudi
  formState.dinggoujiage = row.dinggoujiage
}

const submit = async () => {
  try {
    await formRef.value.validate()
    const res: any = await reqEdit(formState)
    if (res.code == 0) {
      message.success(res.msg)
      $emit('success')
      open.value = false
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
