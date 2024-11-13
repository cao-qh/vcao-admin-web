<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="广告名称" name="mingcheng">
        <a-input
          v-model:value.trim="formState.mingcheng"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="广告类型" name="guanggaoleixing">
        <a-select
          v-model:value="formState.guanggaoleixing"
          placeholder="请选择"
        >
          <a-select-option
            v-for="item in adType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="formState.guanggaoleixing == 1">
        <a-form-item label="有效观看视频时长" name="youxiaoshichang">
          <a-input-number
            :min="0"
            v-model:value.trim="formState.youxiaoshichang"
            placeholder="请输入"
          />
        </a-form-item>
      </template>
      <template v-if="formState.guanggaoleixing == 2">
        <a-form-item label="广告链接" name="guanggaolianjie">
          <a-input
            v-model:value.trim="formState.guanggaolianjie"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item label="落地页返回状态" name="luodiyefanhui">
          <a-select
            v-model:value="formState.luodiyefanhui"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in status"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
      <a-form-item label="上下架" name="shangxiajia">
        <a-radio-group v-model:value="formState.shangxiajia">
          <a-radio-button :value="1">上架</a-radio-button>
          <a-radio-button :value="2">下架</a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/AppConfig/AdSetting'

defineOptions({ name: 'Add' })

// 属性
defineProps({
  adType: {
    type: Array<any>,
    default: () => [],
  },
  status: {
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

const rules = {
  mingcheng: [{ required: true, message: '请输入' }],
  guanggaoleixing: [{ required: true, message: '请选择' }],
  youxiaoshichang: [{ required: true, message: '请输入' }],
  guanggaolianjie: [{ required: true, message: '请输入' }],
  luodiyefanhui: [{ required: true, message: '请选择' }],
  shangxiajia: [{ required: true, message: '请选择' }],
}

const formRef = ref()
const formState = reactive<any>({})

const show = () => {
  open.value = true
  Object.assign(formState, {
    mingcheng: '',
    guanggaoleixing: undefined,
    youxiaoshichang: '',
    luodiyefanhui: null,
    guanggaolianjie: '',
    shangxiajia: 1,
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
