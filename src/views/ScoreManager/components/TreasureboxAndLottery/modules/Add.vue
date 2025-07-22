<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="广告编码" name="guanggaobianma">
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
      <a-form-item label="积分类型" name="jifenleixing">
        <a-select v-model:value="formState.jifenleixing" placeholder="请选择">
          <a-select-option
            v-for="item in jifenleixing"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="最低积分" name="zuidijifen">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.zuidijifen"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="最高积分" name="zuigaojifen">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.zuigaojifen"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item
        v-if="formState.jifenleixing === 2"
        label="抽抽次数"
        name="chouchoucishu"
      >
        <a-input-number
          :min="0"
          v-model:value.trim="formState.chouchoucishu"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item
        v-if="formState.jifenleixing === 1"
        label="开宝箱时长"
        name="kaibaoxiangshichang"
      >
        <a-input-number
          :min="0"
          v-model:value.trim="formState.kaibaoxiangshichang"
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
import { reqAdd } from '@/api/ScoreManager/TreasureboxAndLottery'

defineOptions({ name: 'Add' })

// 属性
defineProps({
  adList: {
    type: Array<any>,
    default: () => [],
  },
  jifenleixing: {
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

const formRef = ref()
const formState = reactive<any>({})

const rules = {
  zuidijifen: [{ required: true, message: '请输入' }],
  zuigaojifen: [{ required: true, message: '请输入' }],
  jifenleixing: [{ required: true, message: '请选择' }],
  chouchoucishu: [{ required: true, message: '请输入' }],
  kaibaoxiangshichang: [{ required: true, message: '请输入' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    guanggaobianma: null,
    jifenleixing: null,
    zuidijifen: '',
    zuigaojifen: '',
    chouchoucishu: '',
    kaibaoxiangshichang: '',
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
