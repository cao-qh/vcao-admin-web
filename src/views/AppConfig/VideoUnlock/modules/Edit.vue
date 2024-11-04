<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="锁方式" name="jiesuofangshi">
        <a-select v-model:value="formState.jiesuofangshi" placeholder="请选择">
          <a-select-option
            v-for="item in lockType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        v-if="formState.jiesuofangshi == 2"
        label="广告编码"
        name="guanggaobianma"
      >
        <a-select v-model:value="formState.guanggaobianma" placeholder="请选择">
          <a-select-option
            v-for="item in adList"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="视频合集编码" name="hejibianma">
        <a-select v-model:value="formState.hejibianma" placeholder="请选择">
          <a-select-option
            v-for="item in videoCollectionList"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="权重" name="quanzhong">
        <a-input
          v-model:value.trim="formState.quanzhong"
          placeholder="请输入"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/AppConfig/VideoUnlock'

defineOptions({ name: 'Edit' })

// 定义方法
const $emit = defineEmits(['success'])

// 属性
defineProps({
  lockType: {
    type: Array<any>,
    default: () => [],
  },
  adList: {
    type: Array<any>,
    default: () => [],
  },
  videoCollectionList: {
    type: Array<any>,
    default: () => [],
  },
})

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
  formState.jiesuofangshi = row.jiesuofangshi
  formState.guanggaobianma = row.guanggaobianma
  formState.hejibianma = row.hejibianma
  formState.quanzhong = row.quanzhong
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
