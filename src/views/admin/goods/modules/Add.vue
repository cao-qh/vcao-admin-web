<template>
  <a-modal
    title="添加"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :width="880"
    centered
    :bodyStyle="{ height: '650px', overflow: 'auto' }"
    :maskClosable="false"
  >
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-row>
        <a-col :xs="24" :sm="12">
          <a-form-item label="产品名称" name="mingcheng">
            <a-input v-model:value="formState.mingcheng" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上级产品名称" name="shangjiMingcheng">
            <a-input
              v-model:value="formState.shangjiMingcheng"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上级产品编码" name="shangjiBianma">
            <a-input
              v-model:value="formState.shangjiBianma"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="参数模板编码" name="canshumobanBianma">
            <a-input
              v-model:value="formState.canshumobanBianma"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
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
        <a-col :xs="24" :sm="12">
          <a-form-item label="归属地" name="guishudi">
            <a-input v-model:value="formState.guishudi" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="订购价格" name="dinggoujiage">
            <a-input-number
              style="width: 100%"
              :min="0"
              v-model:value="formState.dinggoujiage"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item label="渠道商" name="qudaoshangBianma">
            <a-input
              v-model:value="formState.qudaoshangBianma"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="产品详情" name="chanpinXiangqing">
            <a-textarea
              v-model:value="formState.chanpinXiangqing"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="返佣详情" name="fanyongshuoming">
            <a-textarea
              v-model:value="formState.fanyongshuoming"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="启禁用" name="qijinyong">
            <a-select v-model:value="formState.qijinyong" placeholder="请选择">
              <a-select-option
                v-for="item in del"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上下架" name="shangxiajia">
            <a-select
              v-model:value="formState.shangxiajia"
              placeholder="请选择"
            >
              <a-select-option
                v-for="item in shangxiajia"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="宣传图" name="fileXC">
            <UploadImage v-model:value="formState.fileXC" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="落地页图" name="fileLD">
            <UploadImage v-model:value="formState.fileLD" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="确认页面图" name="fileQR">
            <UploadImage v-model:value="formState.fileQR" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/admin/goods'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Add' })
// 属性
withDefaults(
  defineProps<{
    del: any
    shangxiajia: any
    operate: any
  }>(),
  {
    del: () => [],
    shangxiajia: () => [],
    operate: () => ({}),
  },
)

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
  shangjiMingcheng: [{ required: true, message: '不能为空' }],
  shangjiBianma: [{ required: true, message: '不能为空' }],
  mingcheng: [{ required: true, message: '不能为空' }],
  canshumobanBianma: [{ required: true, message: '不能为空' }],
  yunyingshang: [{ required: true, message: '请选择' }],
  guishudi: [{ required: true, message: '不能为空' }],
  dinggoujiage: [{ required: true, message: '不能为空' }],
  qudaoshangBianma: [{ required: true, message: '不能为空' }],
  chanpinXiangqing: [{ required: true, message: '不能为空' }],
  fanyongshuoming: [{ required: true, message: '不能为空' }],
  qijinyong: [{ required: true, message: '请选择' }],
  shangxiajia: [{ required: true, message: '请选择' }],
  fileXC: [{ required: true, message: '请选择' }],
  fileLD: [{ required: true, message: '请选择' }],
  fileQR: [{ required: true, message: '请选择' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    mingcheng: '',
    shangjiMingcheng: '',
    shangjiBianma: '',
    canshumobanBianma: '',
    yunyingshang: '1',
    guishudi: '',
    qijinyong: 1,
    shangxiajia: 1,
    dinggoujiage: '',
    qudaoshangBianma: '',
    chanpinXiangqing: '',
    fanyongshuoming: '',
    fileXC: '',
    fileLD: '',
    fileQR: '',
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)
    const formData = new FormData()
    Object.keys(formState).forEach((key) => {
      if (formState[key] !== undefined && formState[key] !== null) {
        formData.append(key, formState[key])
      }
    })
    console.log(formData)
    const res: any = await reqAdd(formData)
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
