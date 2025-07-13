<template>
  <div style="margin-bottom: 10px">
    <a-form v-bind="layout" ref="formRef" :model="formState" :rules="rules">
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
      <a-form-item v-if="formState.jifenleixing == 1" label="积分" name="jifen">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.jifen"
          placeholder="请输入"
        />
      </a-form-item>
      <template v-if="formState.jifenleixing == 2">
        <a-form-item label="最低积分" name="zuidijifen">
          <a-input-number
            :min="0"
            v-model:value.trim="formState.zuidijifen"
            placeholder="请输入"
          />
        </a-form-item>
        <a-form-item label="最高积分" name="zuigaojifen">
          <a-input-number
            :min="0"
            v-model:value.trim="formState.zuigaojifen"
            placeholder="请输入"
          />
        </a-form-item>
      </template>
      <a-form-item :wrapper-col="{ span: 14, offset: 2 }">
        <a-button type="primary" @click="submit">提交修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { reqSearch, reqEdit } from '@/api/ScoreManager/AdScore'
import { message } from 'ant-design-vue'
import { reqAd } from '@/api/common'

const adList = ref<any>([])
const formState = reactive<any>({})
const formRef = ref()

const jifenleixing = [
  {
    value: 1,
    label: '固定',
  },
  {
    value: 2,
    label: '区间',
  },
]

// 表单布局
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
}

const rules = {
  guanggaobianma: [{ required: true, message: '请选择' }],
  jifenleixing: [{ required: true, message: '请选择' }],
  jifen: [{ required: true, message: '请输入' }],
  zuidijifen: [{ required: true, message: '请输入' }],
  zuigaojifen: [{ required: true, message: '请输入' }],
}

onMounted(() => {
  gatData()
  reqAd().then((res) => {
    if (res.code == 0) {
      adList.value = res.data.map((item: any) => {
        return {
          label: item.mingcheng,
          value: item.bianma,
        }
      })
    }
  })
})

const gatData = async () => {
  const res = await reqSearch()
  if (res.code == 0) {
    formState.guanggaobianma = res.data.guanggaobianma
    formState.jifenleixing = res.data.jifenleixing
    formState.jifen = res.data.jifen
    formState.zuidijifen = res.data.zuidijifen
    formState.zuigaojifen = res.data.zuigaojifen
  } else {
    message.error(res.msg)
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)

    const res = await reqEdit(formState)
    if (res.code == 0) {
      message.success(res.msg)
      gatData()
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}
</script>
